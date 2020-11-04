import fetchCurrency from '../services/fetchCurrency';

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
});

export function requestCurrency() {
  return (dispatch) => {
    fetchCurrency()
      .then((currencyResponse) => dispatch(currencies(currencyResponse)));
  };
}

export function requestCurrencyStore(currenciesState) {
  return async (dispatch) => {
    const responseAPI = await fetchCurrency();
    const newExpensive = { ...currenciesState, exchangeRates: responseAPI };
    dispatch(currenciesStore(newExpensive));
  };
}
