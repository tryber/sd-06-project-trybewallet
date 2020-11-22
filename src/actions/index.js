// import fetchApi from '../data';

export const SAVELOGIN = 'SAVE_LOGIN';
export const OK_CURRENCIES = 'OK_CURRENCIES';
export const EXPENSES = 'EXPENSES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const DEL_EXPENSES = 'DEL_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const ADD_ID = 'ADD_ID';

export const saveLogin = (email) => ({
  type: SAVELOGIN,
  email,
});

// {expenses: {…}, total: 29889.7885}
export const expensesAdd = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const expensesDel = (expenses) => ({
  type: DEL_EXPENSES,
  expenses,
});

export const apiOk = (currencies) => ({
  type: OK_CURRENCIES,
  currencies,
});

export const editExpense = (expenses) => ({
  type: EDIT_EXPENSE,
  expenses,
});
