import fetch from 'isomorphic-fetch';

export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export function registerUser() {
    return {
        type: REGISTER_USER,
    };
}

export function registerUserSuccess(payload) {
    return {
        type: REGISTER_SUCCESS,
        payload,
    };
}

export function registerUserError() {
    return {
        type: REGISTER_ERROR,
    };
}

export function registerUserAction(username, password) {
    return (dispatch) => {
        return registerUserAPI(username, password).then(([response, json]) => {
            if (response.status === 200) { 
                dispatch(registerUserSuccess(json));
            } else {
                dispatch(registerUserError());
            }
        });
    }
}

export function registerUserAPI(username, password) {
    const URL = `http://localhost:5000/register`;
    return fetch(URL, 
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then( response => Promise.all([response, response.json()]));
}

export function loginUser() {
    return {
        type: LOGIN_USER,
    };
}

export function loginUserSuccess(payload) {
    return {
        type: LOGIN_SUCCESS,
        payload,
    };
}

export function loginUserError() {
    return {
        type: LOGIN_ERROR,
    };
}

export function loginUserAction(username, password) {
    return (dispatch) => {
        return loginUserAPI(username, password).then(([response, json]) => {
            if (response.status === 200) {
                dispatch(loginUserSuccess(json));                
            } else {
                dispatch(loginUserError());
            }
        });
    }
}

export function loginUserAPI(username, password) {
    const URL = `http://localhost:5000/login`;
    return fetch(URL, 
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then( response => Promise.all([response, response.json()]));
}