import types from '../services/actionTypes';
// import fetchCurrencies from '../services/currenciesAPI';

const emailToState = (email, log) => (
  {
    type: types.LOG_EMAIL,
    email,
    log,
  });

export default emailToState;

export const responseAPI = (prices) => (
  {
    type: types.RESPONSE,
    prices,
  });

const APIURL = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrenciesAction = () => async (dispatch) => {
  // dispatch(requestAPI());
  const fetchRequest = await fetch(APIURL);
  const jsonResponse = await fetchRequest.json();
  delete jsonResponse.USDT;
  dispatch(responseAPI(jsonResponse));
};

export const addExpenses = (objExpenses, objApi) => (
  {
    type: types.EXPENSES,
    objExpenses,
    objApi,
  });

export const fetchExchangeRatesAction = (objExpenses) => async (dispatch) => {
  const fetchRequest = await fetch(APIURL);
  const objApi = await fetchRequest.json();
  dispatch(addExpenses(objExpenses, objApi));
};

// export const success = (prices) => ({
//   type: types.RESPONSE,
//   prices,
// });

// export const fail = (error) => ({
//   type: 'SEARCH_FAIL',
//   error,
// });

// export function fetchCurrenciesAction() {
//   return (dispatch) => {
//     fetchCurrencies()
//       .then((currencies) => dispatch(success(currencies)))
//       .catch((error) => dispatch(fail(error)));
//   };
// }

// export const requestAPI = () => (
//   {
//     type: types.REQUEST,
//   });
