export const LOGIN_INPUT = 'LOGIN_INPUT';
export const IS_SUCCESS = 'IS_SUCCESS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DEL_ITEM = 'DEL_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';
// export const RATES_SUCCESS = 'RATES_SUCCESS';
// export const RATES_REQUEST = 'RATES_REQUEST';

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

export const setNewExpense = (expenseArray, rates) => ({
  type: ADD_EXPENSE,
  expenseArray,
  rates,
});

// const receiveRatesSuccess = () => ({
//   type: RATES_SUCCESS,
// });

// const requestRates = () => ({
//   type: RATES_REQUEST,
// });

export const fetchExchangeRates = (expenseArray) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  dispatch(setNewExpense(expenseArray, exchangeRates));
};

export const deleteListItem = (id) => ({
  type: DEL_ITEM,
  id,
});

export const editiListItem = (id) => ({
  type: EDIT_ITEM,
  id,
})
