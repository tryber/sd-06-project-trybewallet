import fetchApi from '../services/economiaAPI';

export const HANDLE_USER = 'HANDLE_USER';
export const REQUEST_CURRENCY = 'HANDLE_CURRENCY';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const HANDLE_EXPENSES = 'HANDLE_EXPENSES';

const setEmailForm = (email) => ({
  type: HANDLE_USER,
  email,
});

export default setEmailForm;

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const receiveCurrency = () => ({
  type: RECEIVE_CURRENCY,
});

export function fetchCurrency() {
  return (dispatch) => {
    dispatch(requestCurrency());

    return fetchApi()
      .then(
        (currency) => dispatch(receiveCurrency(currency)),
      );
  };
}
