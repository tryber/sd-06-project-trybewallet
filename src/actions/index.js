// Coloque aqui suas actions
import fetchApi from '../services/fetchApi';
// import { response } from '../tests/mockData';

export const LOGIN = 'LOGIN';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const saveCurrencies = (currencies) => ({
  type: SAVE_CURRENCIES,
  currencies,
});

export function fetchSavedCurrencies() {
  return async (dispatch) => {
    const apiResponse = await fetchApi();
    const objResponse = Object.keys(apiResponse);
    dispatch(saveCurrencies(objResponse));
  };
}

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  expenses,
});

export function saveExpensesAction(data) {
  return async (dispatch) => {
    const rates = await fetchApi();
    dispatch(saveExpenses(data, rates));
  };
}

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});

export const addElement = (expense) => async (dispatch, getState) => {
  const responseApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseApi.json();
  const { wallet: { expenses } } = getState();
  const ID_INITIAL = 0;
  const NEXT_ID = expenses.length ? expenses[expenses.length - 1].id + 1 : ID_INITIAL;
  const NEW_EXPENSE = { ...expense, id: NEXT_ID, exchangeRates: currencies };
  dispatch(saveExpenses(NEW_EXPENSE));
};
