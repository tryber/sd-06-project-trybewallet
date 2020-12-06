async function apiCurrencies() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const data = await fetch(endpoint);
  delete data.USDT;
  console.log('api aaaaaa');
  return data.json();

}

export default apiCurrencies;
