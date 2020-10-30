import fetchApi from '../services/api';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const SAVE_CURRENCY = 'SAVE_CURRENCY';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveCurrency = (currencies) => ({
  type: SAVE_CURRENCY,
  currencies,
});

export function thunkCurrency() {
  return (dispatch) => (
    fetchApi()
      .then((currencies) => dispatch(saveCurrency(currencies)))
  );
}
