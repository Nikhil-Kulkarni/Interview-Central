import fetch from 'isomorphic-fetch';

export function getSuite(id) {
    const URL = `http://localhost:5000/getSuite/${id}`;
    return fetch(URL, { method: 'GET'});
}

export function callCreateSuiteAPI(suiteName, person, questionIds) {
    const URL = "http://localhost:5000/createSuite";
    return fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                suiteName: suiteName,
                person: person,
                questions: questionIds
            })
        });
}

export function deleteSuiteAPI(person, suiteName) {
    const URL = "http://localhost:5000/deleteSuite";
    return fetch(URL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                suiteName: suiteName,
                person: person,
            })
        });
}
