// import { response } from '../tests/mockData';

function fetchApiData() {
  const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(ENDPOINT)
    .then((response) => response.json());
}

// function fetchApiData() {
//   return Promise.resolve(response);
// }

export default fetchApiData;
