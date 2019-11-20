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
            console.log(resp)
            store.dispatch({
                type: 'ADD_CATEGORIES',
                data: resp.data,
            });
        });
}

export function get_product(id) {
    get('/products/'+id)
        .then((resp) => {
            console.log(resp)
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
            console.log(resp);
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

function parseOptions(options){
    let res = {}
    options.forEach(function (value, key) {
        res[value.option_name] = value.quantity
    })
    return res;
}

function parseAttributes(options){
    let res = []
    options.forEach(function (value, key) {
        res.push({attribute_name: value.attribute_name, attribute_description: value.attribute_description})
    })
    return res;
}

export function add_to_cart(data) {
    post('/shoppingcarts', {data}).then((resp) => {
        if (resp.success) {
            console.log(resp.success)
        }
    });
}

export function list_cart_items() {
    let state = store.getState();
    get('/viewCart').then((resp) => {
        console.log("cart", resp)
        if (resp.data) {
            store.dispatch({
                type: 'ADD_TO_CART',
                data: resp.data,
            });
        }
    });
}

export function list_products(id, resolve){
    get('/categories/'+id).then((resp) => {
        console.log("carddt", resp)
        if (resp.data) {
            resolve(resp.data)
        }
    });
}

export function submit_create_product(form) {
    let state = store.getState();
    let data = _.clone(state.forms.new_product);
    if (data.files.length == 0) {
        return;
    }
    data.options = parseOptions(data.options)
    console.log("-",data.options)
    data.attributes = parseAttributes(data.attributes)
    let parsedImages = {}
    var promise1 = new Promise(function(resolve, reject) {
        _.forEach(data.files, function (file) {
            let reader = new FileReader();
            reader.addEventListener("load", () => {
                parsedImages[file.name] = reader.result
                if(data.files.length == Object.keys(parsedImages).length){
                    resolve();
                }
            });
            reader.readAsDataURL(file);
        })
    });

    promise1.then(function() {
        data["images"] = parsedImages
        console.log("data", data)
        post('/createProduct', {data}).then((resp) => {
            if (resp.data) {
                console.log(resp)
            }
        });
    });


}