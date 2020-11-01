import getCurrenciesApi from '../services/serviceApi';

export const SAVE_USER = 'SAVE_USER';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';

export const saveUser = (email) => (
  {
    type: SAVE_USER,
    email,
  }
);

export const addWallet = (expense) => (
  {
    type: ADD_EXPENSE,
    expense,
  }
);

const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return getCurrenciesApi()
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}
