export const LOGIN_INPUT = 'LOGIN_INPUT';
export const IS_SUCCESS = 'IS_SUCCESS';
export const RATES_SUCCESS = 'RATES_SUCCESS';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const loginInput = (email, password) => ({
  type: LOGIN_INPUT,
  email,
  password,
});

export const receiveCurrenciesSuccess = (currencies) => ({
  type: IS_SUCCESS,
  currencies,
});

export const fetchData = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  dispatch(receiveCurrenciesSuccess(currencies));
};

export const setNewExpense = (expenseArray, callback) => ({
  callback: callback(),
  type: ADD_EXPENSE,
  expenseArray,
});

export const receiveRatesSuccess = (rates) => ({
  type: RATES_SUCCESS,
  rates,
});

export const fetchExchangeRates = () => async (dispatch) => {
  const response = await fetch('ttps://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  dispatch(receiveRatesSuccess(exchangeRates));
};
