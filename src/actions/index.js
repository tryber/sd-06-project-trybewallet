export const LOGIN = 'LOGIN';
export const SELECT_CURRENCY = 'SELECT_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const selectCurrencies = (currencies) => ({
  type: 'SELECT_CURRENCY',
  currencies,
});

export const addExpenses = (expenses) => ({
  type: 'ADD_EXPENSES',
  expenses,
});

export const login = (email) => ({ type: 'LOGIN', email });
