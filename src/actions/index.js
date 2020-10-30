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

export const LOAD = 'LOAD ';

function loadAction(currencies) {
  return {
    type: LOAD,
    payload: {
      currencies,
    },
  };
}

export function loadCurrencies() {
  return (
    async (dispatch) => {
      const exchangeRates = await fetchExchangeRates();

      const currencies = Object.keys(exchangeRates);

      const rightCurrencies = currencies.filter((currency) => currency !== 'USDT');

      dispatch(loadAction(rightCurrencies));
    }
  );
}

export const UPDATE = 'UPDATE ';

export function updateTransaction(transactionData, id) {
  return {
    type: UPDATE,
    payload: {
      id,
      transactionData,
    },
  };
}
