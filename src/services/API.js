export default async function fetchAPI() {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  const allCurrencies = await fetch(url);
  const response = await allCurrencies.json();

  return response;
}
