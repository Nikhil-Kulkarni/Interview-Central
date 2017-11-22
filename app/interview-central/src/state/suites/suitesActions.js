import fetch from 'isomorphic-fetch';

// export function getSuite(id) {
//     return getSuiteAPI(id).then(([response, json]) => {
//         if (response.status === 200) {
//             return json
//         } else {
//             return {};
//         }
//     });
// }

export function getSuite(id) {
    const URL = `http://localhost:5000/getSuite/${id}`;
    return fetch(URL, { method: 'GET'});
}