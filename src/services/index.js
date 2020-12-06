async function apiCurrencies() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  delete data.USDT;
  return data.json();
}

export async function apiCurrenciesTwo() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  delete data.USDT;
  return data.json();
}

export default apiCurrencies;
