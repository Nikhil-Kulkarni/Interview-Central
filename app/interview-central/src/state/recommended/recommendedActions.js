import fetch from 'isomorphic-fetch';

export const GET_RECOMMENDED = "GET_RECOMMENDED";
export const RECOMMENDED_SUCCESS = "RECOMMENDED_SUCCESS";
export const RECOMMENDED_ERROR = "RECOMMENDED_ERROR";

export function getQuestions() {
    return {
        type: GET_RECOMMENDED,
    };
}

export function getRecommendedSuccess(payload) {
    return {
        type: RECOMMENDED_SUCCESS,
        payload,
    };
}

export function getRecommendedError() {
    return {
        type: RECOMMENDED_ERROR,
    };
}

export function getRecommendedAction(username) {
    return (dispatch) => {
        return getRecommendedAPI(username).then(([response, json]) => {
            if (response.status === 200) {
                dispatch(getRecommendedSuccess(json));                
            } else {
                dispatch(getRecommendedError());
            }
        });
    }
}

export function getRecommendedAPI(username) {
    const URL = `http://localhost:5000/getRecommendedCategory/${username}`;
    return fetch(URL, { method: 'GET'})
        .then( response => Promise.all([response, response.json()]));
}

export function viewedQuestionCategoryAPI(username, category) {
    const URL = `http://localhost:5000/viewedQuestionCategory`;
    return fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                category: category,
            })
        });
}
