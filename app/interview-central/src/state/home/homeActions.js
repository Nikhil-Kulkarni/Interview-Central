import fetch from 'isomorphic-fetch';

export const GET_HOME_DATA = "GET_HOME_DATA";
export const HOME_DATA_SUCCESS = "HOME_DATA_SUCCESS";
export const HOME_DATA_ERROR = "HOME_DATA_ERROR";
export const GET_SHARED_DATA = "GET_SHARED_DATA";
export const GET_SHARED_SUCCESS = "GET_SHARED_SUCCCESS";
export const GET_SHARED_ERROR = "GET_SHARED_ERROR";

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
    console.log("GetHomeDataAction");
    return (dispatch) => {
        return getHomeDataAPI(username).then(([response, json]) => {
            if (response.status === 200) {
                console.log(json);
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

export function getSharedDataSuccess(payload) {
    return {
        type: GET_SHARED_SUCCESS,
        payload,
    };
}

export function getSharedDataError() {
    return {
        type: GET_SHARED_ERROR,
    };
}

export function getSharedDataAction(username) {
    return (dispatch) => {
        return getSharedDataAPI(username).then(([response, json]) => {
            if (response.status === 200) {
                dispatch(getSharedDataSuccess(json));
            } else {
                dispatch(getSharedDataError());
            }
        });
    }
}

export function getSharedDataAPI(username) {
    const URL = `http://localhost:5000/getRecommendedFromFollowing/${username}`;
    return fetch(URL, { method: 'GET'})
        .then( response => Promise.all([response, response.json()]));
}

export function recommendToFollowers(username, questionId) {
    const URL = `http://localhost:5000/recommendQuestionToFollowers`;
    return fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                questionId: questionId,
            })
        });
}
