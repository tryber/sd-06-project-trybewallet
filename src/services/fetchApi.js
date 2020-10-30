import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

function fetchApi() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endpoint)
    .then((response) => response.json());
}

export default fetchApi;