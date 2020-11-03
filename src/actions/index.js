export const EMAIL_UPDATE = 'EMAIL_UPDATE';
export const PASSWORD_UPDATE = 'PASSWORD_UPDATE';
export const GET_CURRENCY_VALUES_SUCCESS = 'GET_CURRENCY_VALUES_SUCCESS';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const LOADING_CURRENCIES = 'LOADING_CURRENCIES';

export const emailUpdate = (email) => ({
  type: EMAIL_UPDATE,
  email,
});

export const passwordUpdate = (password) => ({
  type: PASSWORD_UPDATE,
  password,
});

const isLoadingCurrencies = () => ({
  type: LOADING_CURRENCIES,
});

const getCurrencyValues = (currencies) => ({
  type: GET_CURRENCY_VALUES_SUCCESS,
  currencies,
});

export function fetchCurrencyValues() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return async (dispatch) => {
    dispatch(isLoadingCurrencies(true));
    const currencyResponse = await fetch(endpoint);
    const currencyJson = await currencyResponse.json();

    return dispatch(getCurrencyValues(currencyJson));
  };
}

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});
