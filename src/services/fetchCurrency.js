const URL = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrency = () => (
  fetch(URL)
    .then((response) => (
      response.json()
        .then((cur) => ((response.ok) ? Promise.resolve(cur) : Promise.reject(cur)))
    ))
);

export default fetchCurrency;
