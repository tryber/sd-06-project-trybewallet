const APIURL = 'https://economia.awesomeapi.com.br/json/all';

async function fetchApi() {
  const response = await fetch(APIURL);
  return response.json();
}

export default fetchApi;
