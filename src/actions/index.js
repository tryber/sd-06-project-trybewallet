export const LOGIN = 'LOGIN';

export const storeEmail = (email) => ({
  type: LOGIN,
  email,
});

export const GET_CURRENCIES = 'GET_CURRENCIES';

const getCurrencies = (data) => ({
  type: GET_CURRENCIES,
  data,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getCurrencies(data));
  };
}

export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpense = (expenses, total) => ({
  type: ADD_EXPENSE,
  expenses,
  total,
});

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (updatedExpenses) => ({
  type: DELETE_EXPENSE,
  updatedExpenses,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const editExpense = (updatedExpense) => ({
  type: EDIT_EXPENSE,
  updatedExpense,
});
