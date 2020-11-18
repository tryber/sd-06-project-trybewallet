export const LOGIN = 'LOGIN';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const CURRENCIES_FETCH = 'CURRENCIES_FETCH';

export const currenciesFetch = (currencies) => ({
  type: CURRENCIES_FETCH,
  currencies,
});

export const currenciesThunk = () => async (dispatch) => {
  const baseURL = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(baseURL);
  const currencies = await response.json();

  dispatch(currenciesFetch(currencies));
};

export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const expensesAction = (expense) => ({
  type: SAVE_EXPENSES,
  expense,
});

export function fetchExchangeRates(expenseData) {
  return async (dispatch) => {
    const baseURL = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(baseURL);
    const currencies = await response.json();
    const expense = { ...expenseData, exchangeRates: currencies };
    dispatch(expensesAction(expense));
  };
}
