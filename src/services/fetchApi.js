import { response } from '../tests/mockData';

// function fetchApiData() {
//   return Promise.resolve(response);
// }

// export default fetchApiData;

window.fetch = async () => ({ json: () => Promise.resolve(response) });
function fetchApi() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endpoint)
    .then((responses) => responses.json());
}

export default fetchApi;
