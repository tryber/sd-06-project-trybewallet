import fetchApi from '../services/economiaAPI';

export const HANDLE_USER = 'HANDLE_USER';

const setEmailForm = (email) => ({
  type: HANDLE_USER,
  email,
});

export default setEmailForm;

export const CURRENCY_SUCCESS = 'CURRENCY_SUCCESS';

export const currencySuccess = (currencies) => ({
  type: CURRENCY_SUCCESS,
  currencies,
});

export function currencyThunk() {
  return async (dispatch) => {
    const apiRequest = await fetchApi();
    const currencies = Object.keys(apiRequest);
    const filterCurrency = currencies.filter((currency) => currency !== 'USDT');
    dispatch(currencySuccess(filterCurrency));
  };
}
