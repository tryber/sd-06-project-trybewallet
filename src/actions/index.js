export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const emailLogin = (loginData) => ({ type: LOGIN, loginData });

export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });
