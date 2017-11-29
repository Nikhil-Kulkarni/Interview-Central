import fetch from 'isomorphic-fetch';

export const GET_QUESTIONS = "GET_QUESTIONS";
export const QUESTIONS_SUCCESS = "QUESTIONS_SUCCESS";
export const QUESTIONS_ERROR = "QUESTIONS_ERROR";

export function getQuestions() {
    return {
        type: GET_QUESTIONS,
    };
}

export function getQuestionsSuccess(payload) {
    return {
        type: QUESTIONS_SUCCESS,
        payload,
    };
}

export function questionsError() {
    return {
        type: QUESTIONS_ERROR,
    };
}

export function getQuestionsAction() {
    return (dispatch) => {
        // dispatch(getQuestions());
        return getQuestionsAPI().then(([response, json]) => {
            if (response.status === 200) {
                dispatch(getQuestionsSuccess(json));
            } else {
                dispatch(questionsError());
            }
        });
    }
}

export function getQuestionsAPI() {
    const URL = `http://localhost:5000/questions`;
    return fetch(URL, { method: 'GET'})
        .then( response => Promise.all([response, response.json()]));
}

export function getQuestionWithIdAPI(questionId) {
    const URL = `http://localhost:5000/question/${questionId}`;
    return fetch(URL, { method: 'GET'});
}

export function getSentiment(category, question) {
    const URL=`http://localhost:5000/getSentiment/${category}/${question}`;
    return fetch(URL, { method: 'GET'});
}

export function getQuestionLeaderboard() {
    const URL="http://localhost:5000/getQuestionLeaderboard";
    return fetch(URL, { method: 'GET'});
}

export function increaseQuestionCount(name) {
    const URL="http://localhost:5000/increaseQuestionCount";
    return fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
            })
        });
}
