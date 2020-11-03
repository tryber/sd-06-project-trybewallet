import fetchCurrency from '../services/fetchCurrency';
import fetchCurrencyStore from '../services/fetchCurrencyStore';

export const login = (email) => ({
  type: 'LOGIN',
  email,
});

export const currencies = (currenciesAPI) => ({
  type: 'FETCH_CURRENCY',
  currenciesAPI,
});

export const currenciesStore = (currenciesAPI) => ({
  type: 'FETCH_CURRENCY_STORE',
  currenciesAPI,
})

export function requestCurrency() {
  return (dispatch) => {
    fetchCurrency()
      .then((currencyResponse) => dispatch(currencies(currencyResponse)));
  };
}

export function requestCurrencyStore() {
  return (dispatch) => {
    fetchCurrencyStore()
      .then((currStoreResponse) => dispatch(currenciesStore(currStoreResponse)));
  }
}
