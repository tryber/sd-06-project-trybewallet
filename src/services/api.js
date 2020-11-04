async function getAllCurrency() {
  const api = 'https://economia.awesomeapi.com.br/';
  const endpoint = 'json/all';
  const requestURL = `${api}${endpoint}`;
  const categoriesPromise = await fetch(requestURL);
  return categoriesPromise.json();
}

export default getAllCurrency;
