// Coloque aqui suas actions
import fetchApi from '../services/fetchApi';

export const LOGIN = 'LOGIN';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

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

export const saveExpenses = (expense, currencies) => ({
  type: SAVE_EXPENSES,
  ...expense,
  rates: currencies,
});

export function saveExpensesAction(expense) {
  return async (dispatch) => {
    const rates = await fetchApi();
    dispatch(saveExpenses(expense, rates));
  };
}
