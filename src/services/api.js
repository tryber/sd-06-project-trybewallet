const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = () => (
  fetch(APIURL)
    .then((response) => (response.json()))
);

// import { response } from '../tests/mockData';

// window.fetch = async () => ({ json: () => Promise.resolve(response) });
// function fetchApi() {
//   const endpoint = 'https://economia.awesomeapi.com.br/json/all';
//   return fetch(endpoint)
//     .then((answer) => answer.json());
// }

export default fetchApi;
