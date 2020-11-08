import fetchApi from '../services/fetchApi';

export const LOGIN = 'LOGIN';
export const SUCESS_CURRENCIES = 'SUCESS_CURRENCIES';
export const SUCESS_EXPENSES = 'SUCESS_EXPENSES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const sucessCurrencies = (currencies) => ({
  type: SUCESS_CURRENCIES,
  currencies,
});

export const sucessExpenses = (expenses) => ({
  type: SUCESS_EXPENSES,
  expenses,
});

export function currentThunk() {
  return (dispatch) => (
    fetchApi()
      .then((currencies) => {
        const tempCurrencies = Object.keys(currencies);
        dispatch(sucessCurrencies(tempCurrencies.filter((curr) => (curr !== 'USDT'))));
      })
  );
}

export function thunkExpenses(expenses) {
  return (dispatch) => (
    dispatch(sucessExpenses(expenses))
  );
}
