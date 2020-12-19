// Coloque aqui suas actions
const LOGIN = 'LOGIN';
const EXPENSE = 'EXPENSE';
const FETCH = 'FETCH';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: EXPENSE,
  expense,
});

export const receiveCurrenciesList = (currencies) => ({
  type: FETCH,
  currencies,
});

export const fetchCurrencies = () => async (dispatch) => {
  const APIURL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(APIURL);
  const currencies = await response.json();
  return dispatch(receiveCurrenciesList(currencies));
};
