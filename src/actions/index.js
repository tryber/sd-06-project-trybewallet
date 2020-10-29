import currencyAPI from '../services/currencyAPI';

export const EMAIL_INPUT = 'EMAIL_INPUT';

export const currencySuccess = (value) => ({
  type: 'FETCH_SUCCESS',
  value,
});

export const currencyError = (error) => ({
  type: 'FETCH_FAIL',
  error,
});

export const emailSaveToState = (value) => ({
  type: EMAIL_INPUT,
  email: value,
});

export const thunkCurrency = (name) => (dispatch) => {
  currencyAPI(name)
    .then((convertedValue) => dispatch(currencySuccess(convertedValue.ask)))
    .catch((error) => dispatch(currencyError(error)));
};
