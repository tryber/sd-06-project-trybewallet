const BASE_API = 'https://economia.awesomeapi.com.br';

const getAllCurrenciesAPI = () => fetch(`${BASE_API}/json/all`)
  .then((response) => (response.json()));

export default getAllCurrenciesAPI;