const CURRENCY_BASE_API = 'https://economia.awesomeapi.com.br';

export default getCurrencyApi = () => (
  fetch(`${CURRENCY_BASE_API}/json/all`)// -- onde tem all pode ser a moeda escolhida
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);
