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
