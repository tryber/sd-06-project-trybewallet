const APIRUL = 'https://economia.awesomeapi.com.br/json/all/';

const currencyAPI = (currency = '') => (
  fetch(`${APIRUL}${currency}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.status ? Promise.reject(json) : Promise.resolve(json)))
    ))
);

export default currencyAPI;
