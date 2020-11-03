import fetchAPI from '../services/fetchAPICurrencies';
// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const addexpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await fetchAPI();
    const currencies = Object.keys(response);
    const currenciesWithoutUSDT = currencies.filter((coin) => coin !== 'USDT');
    dispatch(getCurrencies(currenciesWithoutUSDT));
  };
}
