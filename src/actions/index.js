import fetchApi from '../data';

export const SAVELOGIN = 'SAVE_LOGIN';
export const OK_CURRENCIES = 'OK_CURRENCIES';
export const EXPENSES = 'EXPENSES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

export const saveLogin = (email) => ({
  type: SAVELOGIN,
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const apiOk = (currencies) => ({
  type: OK_CURRENCIES,
  currencies,
});

export const currencyThunk = () => (dispatch) => {
  fetchApi()
    .then((currencies) => {
      dispatch(apiOk(currencies));
    });
};
