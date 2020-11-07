import fetchAPI from '../services/fetchAPI';
import { SET_LOGIN, GET_CURRENCIES, ADD_EXPENSES } from './types';

export const login = (email) => ({
  type: SET_LOGIN,
  email,
});

export const addExpenses = (expense) => ({
  type: ADD_EXPENSES,
  expense,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const currencies = await fetchAPI();
    dispatch(getCurrencies(currencies));
  };
}

export const addExpenseThunk = (expense) => async (dispatch) => {
  const currencies = await fetchAPI();
  dispatch(addExpenses(({ ...expense, exchangeRates: currencies })));
};
