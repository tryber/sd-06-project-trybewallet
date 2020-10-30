export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCY = 'ADD_CURRENCY';

export const emailLogin = (value) => ({ type: LOGIN, value });

export const addExpense = (value) => ({ type: ADD_EXPENSE, value });

export const addCurrency = (value) => ({ type: ADD_CURRENCY, value });
