export default async function getCurrencies() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const currencies = await fetch(endpoint);
  const currenciesObj = await currencies.json();
  return currenciesObj;
}
