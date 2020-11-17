import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

function currAPI() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endpoint)
    .then((resp) => resp.json());
}

export default currAPI;
