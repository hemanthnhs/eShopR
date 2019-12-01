import store from './../store';
import React from "react";
import socket from "../socket"

export function post(path, body) {
    let state = store.getState();
    let token = state.session ? state.session.token || "" : "";

    return fetch('/ajax' + path, {
        method: 'post',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function put(path, body) {
    let state = store.getState();
    let token = state.session ? state.session.token || "" : "";

    return fetch('/ajax' + path, {
        method: 'put',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function del(path, body) {
    let state = store.getState();
    let token = state.session ? state.session.token || "" : "";

    return fetch('/ajax' + path, {
        method: 'delete',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        body: JSON.stringify(body),
    }).then((resp) => resp.json());
}

export function get(path) {
    let state = store.getState();
    let token = state.session ? state.session.token || "" : "";
    let current_user = state.session ? state.session.user_id || null : null;

    return fetch('/ajax' + path, {
        method: 'get',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
        assigns: {current_user: "current_user"}
    }).then((resp) => resp.json());
}

export function list_categories() {
    get('/categories')
        .then((resp) => {
            store.dispatch({
                type: 'ADD_CATEGORIES',
                data: resp.data,
            });
        });
}

export function get_product(id) {
    get('/products/' + id)
        .then((resp) => {
            store.dispatch({
                type: 'ADD_PRODUCT',
                data: resp.data,
            });
        });
}

export function submit_login(form) {
    let state = store.getState();
    let data = state.forms.login;

    post('/sessions', data)
        .then((resp) => {
            if (resp.token) {
                localStorage.setItem('session', JSON.stringify(resp));
                store.dispatch({
                    type: 'LOG_IN',
                    data: resp,
                });
                form.redirect('/');
            } else {
                store.dispatch({
                    type: 'CHANGE_LOGIN',
                    data: {errors: JSON.stringify(resp.errors)},
                });
            }
        });
}

function parseOptions(options) {
    let res = {}
    options.forEach(function (value, key) {
        res[value.option_name] = value.quantity
    })
    return res;
}

function parseAttributes(options) {
    let res = []
    options.forEach(function (value, key) {
        res.push({attribute_name: value.attribute_name, attribute_description: value.attribute_description})
    })
    return res;
}

export function add_to_cart(data, resolve) {
    post('/shoppingcarts', {data}).then((resp) => {
        resolve(resp);
    });
}

export function list_cart_items() {
    let state = store.getState();
    get('/viewCart').then((resp) => {
        if (resp.data) {
            store.dispatch({
                type: 'ADD_TO_CART',
                data: resp.data,
            });
            store.dispatch({
                type: 'CART_PRICE',
                data: resp.total_val
            })
        }
    });
}

export function list_products(id, resolve) {
    get('/categories/' + id).then((resp) => {
        if (resp.data) {
            resolve(resp.data)
        }
    });
}

export function submit_create_product(resolve2, reject2) {
    let state = store.getState();
    let data = _.clone(state.forms.new_product);
    console.log(data.main_category)
    if (!data.main_category) {
        reject2("Main category must be selected")
        return;
    }
    if (!data.sub_category) {
        reject2("Sub category must be selected")
        return;
    }
    if (data.files.length == 0) {
        reject2("Upload atleast one product image")
        return;
    }
    data.options = parseOptions(data.options)
    data.attributes = parseAttributes(data.attributes)
    let parsedImages = {}
    var promise1 = new Promise(function (resolve, reject) {
        _.forEach(data.files, function (file) {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                parsedImages[file.name] = reader.result
                if (data.files.length == Object.keys(parsedImages).length) {
                    resolve();
                }
            });
            reader.readAsDataURL(file);
        })
    });

    promise1.then(function () {
        data["images"] = parsedImages
        post('/createProduct', {data}).then((resp) => {
            if (resp.success) {
                resolve2(resp.success)
            } else {
                reject2("Provide all the fields information and try again.")
            }
        });
    });
}

export function submit_landing_page(resolve, reject) {
    let state = store.getState();
    let data = _.clone(state.forms.new_landing_page);
    // Attribution: https://stackoverflow.com/questions/43704904/how-to-stringify-objects-containing-es5-sets-and-maps
    Map.prototype.toJSON = function () {
        var obj = {}
        for (let [key, value] of this)
            obj[key] = value
        return obj
    }
    post('/adminconfigs', {key: "LANDING_PAGE", value: JSON.stringify(data)}).then((resp) => {
        console.log("resp", resp)
        if (resp.success) {
            resolve()
        }
    })
}

export function submit_add_address(resolve2) {
    let state = store.getState();
    let data = _.clone(state.forms.new_address);
    post('/addAddress', {data}).then((resp) => {
        if (resp.success) {
            resolve2();
        }
    })
}

export function get_landing_page_config() {
    get('/adminconfigs/LANDING_PAGE')
        .then((resp) => {
            if (resp.data) {
                store.dispatch({
                    type: 'LANDING_PAGE_CONFIG',
                    data: JSON.parse(resp.data.value),
                });
            } else {
                store.dispatch({
                    type: 'LANDING_PAGE_CONFIG',
                    data: null,
                });
            }
        });
}

export function search(query, resolve) {
    get('/search?query=' + query)
        .then((resp) => {
            resolve(resp.data)
        });
}

export function list_orders() {
    get('/orders')
        .then((resp) => {
            store.dispatch({
                type: 'ORDERS_DATA',
                data: resp.data,
            });
        });
}

export function place_order(resolve, reject, address_selected) {
    post('/placeOrder', {address_id: address_selected})
        .then((resp) => {
            if (resp.success) {
                store.dispatch({
                    type: 'CLEAR_CART',
                });
                resolve(resp.success)
            } else {
                reject(resp)
            }
        });
}

export function list_address() {
    get('/manageAddress')
        .then((resp) => {
            store.dispatch({
                type: 'ADDRESS_DATA',
                data: resp.data,
            });
        });
}


export function get_statuses() {
    get('/status')
        .then((resp) => {
            store.dispatch({
                type: 'ORDER_STATUS',
                data: resp.data,
            });
        });
}

export function update_order_status(id, status_id, tracking_num) {
    if (status_id == 4) {
        put('/orders/' + id, {id: id, status_id: status_id, tracking: tracking_num}).then((resp) => {
            store.dispatch({
                type: 'ORDERS_DATA',
                data: [resp.data],
            });
        })
    } else {
        put('/orders/' + id, {id: id, status_id: status_id}).then((resp) => {
            store.dispatch({
                type: 'ORDERS_DATA',
                data: [resp.data],
            });
        })
    }
}

export function update_quantity(id, cartid, product_id, option_selected, quantity) {
    put('/shoppingcarts/' + id, {quantity: quantity})
        .then((resp) => {
            if (resp.data) {
                store.dispatch({
                    type: 'ADD_TO_CART',
                    data: [resp.data],
                });
                store.dispatch({
                    type: 'CART_PRICE',
                    data: resp.total_val
                });
            }
        });
}

export function delete_item(id, key) {
    del('/shoppingcarts/' + id, {})
        .then((resp) => {
            if (resp.success) {
                store.dispatch({
                    type: 'REMOVE_ITEM',
                    data: key,
                });
                store.dispatch({
                    type: 'CART_PRICE',
                    data: resp.total_val
                });
            }
        });
}

export function get_tracking_status(order_id, resolve) {
    get('/trackingStatus?tracking_order=' + order_id)
        .then((resp) => {
            console.log("Request Successful")
            resolve(resp);
        });
}

export function seller_products() {
    get('/products')
        .then((resp) => {
            store.dispatch({
                type: 'SELLER_LISTINGS',
                data: resp.data
            });
        });
}

export function get_seller_metrics() {
    get('/seller_metrics')
        .then((resp) => {
            store.dispatch({
                type: 'SELLER_METRICS',
                data: resp
            });
        });
}

export function submit_new_registration(resolve2, reject2){
    let state = store.getState();
    let data = _.clone(state.forms.new_registration);
    post('/newRegistration', {data}).then((resp) => {
        if (resp.success) {
            resolve2();
        }else{
            reject2(resp)
        }
    })
}