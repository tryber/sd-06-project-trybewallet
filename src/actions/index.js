import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

function getCurrency(currencyData) {
  return { type: 'GET_CURRENCY', payload: currencyData };
}

export default function fetchCurrency() {
  return async (dispatch) => {
    const currencyResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyJson = await currencyResponse.json();

    dispatch(getCurrency(currencyJson));
  };
}
