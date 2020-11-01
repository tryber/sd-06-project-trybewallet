import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

function getCurrency(currencyData) {
  return { type: 'GET_CURRENCY', payload: currencyData };
}

/* function requestCurrency() {
  return { type: 'REQUEST_CURRENCY' };
} */

/* function failedRequest(error) {
  return { type: 'FAILED_REQUEST', payload: error };
} */

export default function fetchCurrency() {
  return async (dispatch) => {
    /* dispatch(requestCurrency()); */

    const currencyResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyJson = await currencyResponse.json();

    dispatch(getCurrency(currencyJson));
    /* return dispatch(failedRequest(error)); */
  };
}
