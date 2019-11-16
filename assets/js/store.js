import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';

function login(st0 = {email: "", password: "", errors: null}, action) {
    switch(action.type) {
        case 'CHANGE_LOGIN':
            return Object.assign({}, st0, action.data);
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

function root_reducer(st0, action) {
    let reducer = combineReducers({
        forms,
        session,
        categories,
        alerts,
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;