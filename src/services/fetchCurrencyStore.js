const URL = 'https://economia.awesomeapi.com.br/json/all';

const param = `USD-BRL,CAD-BRL,AUD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,
JPY-BRL,CHF-BRL,CNY-BRL,YLS-BRL,BTC-BRL,LTC-BRL,ETH-BRL,XRP-BRL`

const fetchCurrencyStore = () => (
  fetch(`${URL}/${param}`)
    .then((response) => (
      response.json()
        .then((cur) => ((response.ok) ? Promise.resolve(cur) : Promise.reject(cur)))
    ))
);

export default fetchCurrencyStore;
