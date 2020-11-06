export const LOGIN = 'LOGIN';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const RECEIVE_CURRENCY_OK = 'RECEIVE_CURRENCY_OK';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const requestCurrencyOk = (currency) => ({
  type: RECEIVE_CURRENCY_OK,
  currency,
});
