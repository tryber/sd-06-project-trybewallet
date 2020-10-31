import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

async function fetchApi() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endpoint);
  return await response.json();
}

export default fetchApi;
