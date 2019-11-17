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
            store.dispatch({
                type: 'ADD_CATEGORIES',
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
            }
            else {
                store.dispatch({
                    type: 'CHANGE_LOGIN',
                    data: {errors: JSON.stringify(resp.errors)},
                });
            }
        });
}