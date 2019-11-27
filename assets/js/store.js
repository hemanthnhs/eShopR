import {createStore, combineReducers} from 'redux';
import deepFreeze from 'deep-freeze-strict';

function login(st0 = {email: "", password: "", errors: null}, action) {
    switch (action.type) {
        case 'CHANGE_LOGIN':
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function new_landing_page(st0 = {
    num_of_rows: 1,
    row_data: new Map([[1, {num_of_cols: 1, col_data: new Map([[1, {banner_img: null, width: 0, navigate_to: ""}]])}]])
}, action) {
    switch (action.type) {
        case 'ADD_ROW':
            var curr_row = st0.num_of_rows + 1
            var updated_rows = new Map(st0.row_data);
            updated_rows.set(curr_row, {
                num_of_cols: 1,
                col_data: new Map([[1, {banner_img: "", width: 0, navigate_to: ""}]])
            })
            return Object.assign({}, st0, {num_of_rows: st0.num_of_rows + 1, row_data: updated_rows});
        case 'REMOVE_ROW':
            var updated_rows = st0.row_data
            updated_rows.delete(st0.num_of_rows)
            return Object.assign({}, st0, {num_of_rows: st0.num_of_rows - 1, row_data: updated_rows});
        case 'ADD_COLUMN':
            var parsedId = parseInt(action.row_id)
            var updated_rows = new Map(st0.row_data);
            var changing_row = updated_rows.get(parsedId);
            var curr_col = changing_row.num_of_cols + 1
            var updated_cols = new Map(changing_row.col_data);
            updated_cols.set(curr_col, {banner_img: "", width: 0, navigate_to: ""})
            updated_rows.set(parsedId, {num_of_cols: changing_row.num_of_cols + 1, col_data: updated_cols})
            return Object.assign({}, st0, {num_of_rows: st0.num_of_rows, row_data: updated_rows});
        case 'CHANGE_LANDING_DATA':
            var rowId = parseInt(action.row_id)
            var updated_rows = new Map(st0.row_data);
            var changing_row = updated_rows.get(rowId);
            var colId = parseInt(action.col_id)
            var updated_cols = new Map(changing_row.col_data);
            var changing_col = updated_cols.get(colId);
            changing_col = Object.assign({}, changing_col, action.data)
            updated_cols.set(colId, changing_col)
            changing_row = Object.assign({}, changing_row, {col_data: updated_cols})
            updated_rows.set(rowId, changing_row)
            return Object.assign({}, st0, {row_data: updated_rows});
        default:
            return st0;
    }
}

function new_product(st0 = {
    name: "",
    category: "",
    marked_price: 0,
    selling_price: 0,
    files: [],
    errors: null,
    num_of_tasks: 1,
    num_of_attributes: 1,
    options: new Map([[1, {option_name: "", quantity: 0}]]),
    attributes: new Map([[1, {attribute_name: "", attribute_description: ""}]])
}, action) {
    switch (action.type) {
        case 'CREATE_PRODUCT':
            return Object.assign({}, st0, action.data);
        case 'ADD_IMAGE':
            let newFiles = st0.files.slice(0);
            newFiles.push(action.data)
            return Object.assign({}, st0, {files: newFiles});
        case 'ADD_OPTION':
            var curr_row = st0.num_of_tasks + 1
            var updated_rows = new Map(st0.options);
            updated_rows.set(curr_row, {option_name: "", quantity: 0})
            return Object.assign({}, st0, {num_of_tasks: st0.num_of_tasks + 1, options: updated_rows});
        case 'REMOVE_OPTION':
            var updated_rows = st0.options
            updated_rows.delete(st0.num_of_tasks)
            return Object.assign({}, st0, {num_of_tasks: st0.num_of_tasks - 1, options: updated_rows});
        case 'ADD_ATTRIBUTE':
            var curr_row = st0.num_of_attributes + 1
            var updated_rows = new Map(st0.attributes);
            updated_rows.set(curr_row, {attribute_name: "", attribute_description: ""})
            return Object.assign({}, st0, {num_of_attributes: st0.num_of_attributes + 1, attributes: updated_rows});
        case 'REMOVE_ATTRIBUTE':
            var updated_rows = st0.attributes
            updated_rows.delete(st0.num_of_tasks)
            return Object.assign({}, st0, {num_of_attributes: st0.num_of_attributes - 1, attributes: updated_rows});
        case 'CHANGE_OPTIONS_DATA':
            var parsedId = parseInt(action.id)
            var updated_rows = new Map(st0.options);
            var changing_row = updated_rows.get(parsedId);
            switch (action.updated_key) {
                case 'option_name':
                    changing_row.option_name = action.data
                    break;
                case 'quantity':
                    changing_row.quantity = action.data
                    break;
                default:
                    changing_row = changing_row
            }
            updated_rows.set(parsedId, changing_row)
            return Object.assign({}, st0, {options: updated_rows});
        case 'CHANGE_ATTRIBUTES_DATA':
            var parsedId = parseInt(action.id)
            var updated_rows = new Map(st0.attributes);
            var changing_row = updated_rows.get(parsedId);
            switch (action.updated_key) {
                case 'attribute_name':
                    changing_row.attribute_name = action.data
                    break;
                case 'attribute_description':
                    changing_row.attribute_description = action.data
                    break;
                default:
                    changing_row = changing_row
            }
            updated_rows.set(parsedId, changing_row)
            return Object.assign({}, st0, {attributes: updated_rows});

        default:
            return st0;
    }
}

function categories(st0 = {}, action) {
    switch (action.type) {
        case 'ADD_CATEGORIES':
            var st1 = {}
            st1 = action.data
            return st1;
        default:
            return st0;
    }
}

function products(st0 = {}, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            var st1 = _.clone(st0)
            st1[action.data.id] = action.data
            return st1;
        default:
            return st0;
    }
}

function seller_products(st0 = null, action) {
        switch (action.type) {
            case 'SELLER_LISTINGS':
                if(!st0){
                    st0 = new Map()
                }
                var st1 = new Map(st0);
                for (let obj of action.data) {
                    st1.set(obj.id, obj);
                }
            return st1;
        default:
            return st0;
    }
}

function alerts(st0 = [], action) {
    switch (action.type) {
        case 'NEW_ALERTS':
            var st1 = st0.slice(0)
            st1.push({type: "warning", id: action.data["sheet_id"], message: action.data["message"]})
            return st1;
        case 'REMOVE_ALERT':
            var st1 = st0
            let id = st1.indexOf(action.data);
            return [...st1.slice(0, id), ...st1.slice(id + 1)]
        default:
            return st0;
    }
}

function forms(st0, action) {
    let reducer = combineReducers({
        login,
        new_product,
        new_landing_page,
        cart_total,
    });
    return reducer(st0, action);
}

let session0 = localStorage.getItem('session');
if (session0) {
    session0 = JSON.parse(session0);
}

function session(st0 = session0, action) {
    switch (action.type) {
        case 'LOG_IN':
            return action.data;
        case 'LOG_OUT':
            return null;
        default:
            return st0;
    }
}

function landing_page(st0 = {}, action) {
    switch (action.type) {
        case 'LANDING_PAGE_CONFIG':
            return action.data;
        default:
            return st0;
    }
}

function cart(st0 = null, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            if(!st0){
                st0 = new Map()
            }
            var st1 = new Map(st0);
            for (let obj of action.data) {
                st1.set("" + obj.product_id + "_" + obj.option_selected, obj);
            }
            return st1;
        case 'REMOVE_ITEM':
            var st1 = new Map(st0);
            st1.delete(action.data)
            return st1;
        default:
            return st0;
    }
}

function cart_total(st0 = 0, action){
    switch (action.type) {
        case 'CART_PRICE':
            return action.data;
        default:
            return st0;
    }
}

function orders(st0 = new Map(), action) {
    switch (action.type) {
        case 'ORDERS_DATA':
            let st1 = new Map(st0);
            for (let obj of action.data) {
                st1.set(obj.id, obj);
            }
            return st1;
        default:
            return st0;
    }
}

function status(st0 = new Map(), action) {
    switch (action.type) {
        case 'ORDER_STATUS':
            let st1 = new Map(st0);
            for (let obj of action.data) {
                st1.set(obj.id, obj.title);
            }
            return st1;
        default:
            return st0;
    }
}

function root_reducer(st0, action) {
    let reducer = combineReducers({
        forms,
        products,
        seller_products,
        session,
        orders,
        status,
        landing_page,
        categories,
        cart,
        alerts,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;