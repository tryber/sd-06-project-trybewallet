import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

function currenciesAPI() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endpoint)
    .then((res) => res.json());
}

export default currenciesAPI;
