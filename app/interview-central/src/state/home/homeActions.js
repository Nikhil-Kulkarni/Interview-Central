import fetch from 'isomorphic-fetch';

export const GET_HOME_DATA = "GET_HOME_DATA";
export const HOME_DATA_SUCCESS = "HOME_DATA_SUCCESS";
export const HOME_DATA_ERROR = "HOME_DATA_ERROR";

export function getHomeData() {
    return {
        type: GET_HOME_DATA,
    };
}

export function getHomeDataSuccess(payload) {
    return {
        type: HOME_DATA_SUCCESS,
        payload,
    };
}

export function getHomeDataError() {
    return {
        type: HOME_DATA_ERROR,
    };
}

export function getHomeDataAction(username) {
    return (dispatch) => {
        return getHomeDataAPI(username).then(([response, json]) => {
            if (response.status === 200) {
                dispatch(getHomeDataSuccess(json));                
            } else {
                dispatch(getHomeDataError());
            }
        });
    }
}

export function getHomeDataAPI(username) {
    // TODO: REMOVE HARDCODED USERNAME LATER
    const URL = `http://localhost:5000/getHomeData/${username}`;
    return fetch(URL, { method: 'GET'})
        .then( response => Promise.all([response, response.json()]));
}