import fetch from 'isomorphic-fetch';

export function getSuite(id) {
    const URL = `http://localhost:5000/getSuite/${id}`;
    return fetch(URL, { method: 'GET'});
}