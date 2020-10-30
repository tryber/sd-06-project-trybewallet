import fetchAPI from '../services';

export const CURRENCIES = 'CURRENCIES';
export const success = (currencies) => ({ type: CURRENCIES, currencies });

export const LOGIN = 'LOGIN';
export const login = (email) => ({ type: LOGIN, email });

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });

export function fetchCurrencies() {
  return async (dispatch) => {
    const apiResponse = await fetchAPI();
    const currencies = Object.keys(apiResponse);
    const currenciesWithoutUSDT = currencies.filter((coin) => coin !== 'USDT');
    dispatch(success(currenciesWithoutUSDT));
  };
}
