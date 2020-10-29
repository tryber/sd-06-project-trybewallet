import fetchExchangeRates from '../services/exchangeRatesAPI';

export const LOG = 'LOG';

export function logAction(email = '') {
  return {
    type: LOG,
    email,
  };
}

export const REGISTER = 'REGISTER';

function saveTransaction({
  value,
  currency,
  description,
  method,
  tag,
  exchangeRates,
}) {
  return {
    type: REGISTER,
    payload: {
      value,
      currency,
      description,
      method,
      tag,
      exchangeRates,
    },
  };
}

export function createTransaction({ value, currency, description, method, tag }) {
  return (
    async (dispatch) => {
      const exchangeRates = await fetchExchangeRates();

      dispatch(saveTransaction({
        value,
        currency,
        description,
        method,
        tag,
        exchangeRates,
      }));
    }
  );
}

export const REMOVE = 'REMOVE';

export function removeTransaction(transactionID) {
  return {
    type: REMOVE,
    payload: {
      transactionID,
    },
  };
}
