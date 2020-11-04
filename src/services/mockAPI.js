import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

async function fetchApi() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const responseRequest = await fetch(endpoint);
  return await responseRequest.json();
}

export default fetchApi;
