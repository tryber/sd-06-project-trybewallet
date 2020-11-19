import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

async function fetchApi() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const requisicao = await fetch(endpoint);
  const json1 = await requisicao.json();
  delete json1.USDT;
  // console.log(json1);
  return json1;
}

export default fetchApi;
