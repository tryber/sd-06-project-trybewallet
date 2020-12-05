import fetchCurrencies from '../services';

export const EXPENSES = 'EXPENSES';

const walletData = ({ value, description, currency, method, tag, exchangeRates }) => ({
  type: EXPENSES,
  payload: {
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  },
});

export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';

const sendCurrencies = (currencies) => ({
  type: LOAD_CURRENCIES,
  payload: {
    currencies,
  },
});

export function requestCurrencies() {
  return (
    async (dispatch) => {
      const currenciesApi = await fetchCurrencies();
      const currenciesKey = Object.keys(currenciesApi);
      const currenciesFilter = currenciesKey.filter((currency) => currency !== 'USDT');
      dispatch(sendCurrencies(currenciesFilter));
    }
  );
}

export function createExpense({ value, description, currency, method, tag }) {
  return (
    async (dispatch) => {
      const exchangeRates = await fetchCurrencies();
      dispatch(walletData({ value, description, currency, method, tag, exchangeRates }));
    }
  );
}
