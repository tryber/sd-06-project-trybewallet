const API_URL = 'https://economia.awesomeapi.com.br/json/all';
// const SELECTED_CURRENCIES = 'USD-BRL,CAD-BRL,EUR-BRL,GBP-BRL,ARS-BRL,BTC-BRL,LTC-BRL,JPY-BRL,CHF-BRL,AUD-BRL,CNY-BRL,ILS-BRL,ETH-BRL,XRP-BRL,';

const fetchAPI = () => (
  fetch(`${API_URL}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))))));

export default fetchAPI;

// fetch(`${APIURL}${char.split().join('+')}`)

// Moedas selecionadas separado por vírgula (,) Ex.: USD-BRL,EUR-BRL,BTC-BRL

// const charAPI = (char) => (
//   fetch(`${APIURL}${char.split().join('+')}`)
//     .then((response) => (
//       response
//         .json()
//         .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
//     ))
// );

// export default charAPI;
