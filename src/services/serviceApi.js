const URL = 'https://economia.awesomeapi.com.br/json/all';
const getCurrenciesApi = () => (
  fetch(URL)
    .then((response) => (response.json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrenciesApi;
