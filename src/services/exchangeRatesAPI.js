const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

async function fetchExchangeRates() {
  const response = await fetch(ENDPOINT);
  const jsonResponse = await response.json();

  return jsonResponse;
}

export default fetchExchangeRates;
