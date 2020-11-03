// Coloque aqui suas actions
export const WALLET_INPUT = 'WALLET_INPUT';
export const UPDATE_EXCHANGE_INFO = 'UPDATE_EXCHANGE_INFO';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const LOGIN_INPUT = 'LOGIN_INPUT';

export const loginInput = (name, input) => ({
  type: LOGIN_INPUT,
  field: name,
  value: input,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  value: expense,
});

export const updateExchangeInfo = (exchangeInfo) => ({
  type: UPDATE_EXCHANGE_INFO,
  value: exchangeInfo,
});
