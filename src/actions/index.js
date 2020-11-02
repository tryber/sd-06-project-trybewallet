export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REQUEST_CURRENCIES_PRICE = 'REQUEST_CURRENCIES_PRICE';
export const RECEIVE_CURRENCIES_PRICE = 'RECEIVE_CURRENCIES_PRICE';
const API_CURRENCIES_PRICE = 'https://economia.awesomeapi.com.br/json/all';

export const addEmailToState = (email, loggedIn) => (
  {
    type: ADD_EMAIL,
    email,
    loggedIn,
  });

export const addExpensesToState = (payload, totalExpenses) => (
  {
    type: ADD_EXPENSES,
    payload,
    totalExpenses,
  });

export const requestPrices = () => (
  {
    type: REQUEST_CURRENCIES_PRICE,
  });

export const receivePrices = (prices) => (
  {
    type: RECEIVE_CURRENCIES_PRICE,
    prices,
  });

export const fetchCurrenciesPrice = () => async (dispatch) => {
  dispatch(requestPrices());
  const fetchPrices = await fetch(API_CURRENCIES_PRICE);
  const jsonPrices = await fetchPrices.json();
  delete jsonPrices.USDT;
  return dispatch(receivePrices(jsonPrices));
};
