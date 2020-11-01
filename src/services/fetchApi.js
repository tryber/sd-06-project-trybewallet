const API_URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrencyApi = () => fetch(API_URL)
  .then((response) => response.json());

export default fetchCurrencyApi;
