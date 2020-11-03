// Coloque aqui suas actions
import awesomeAPI from '../services/awesomeAPI';

export const EMAIL_STORE = 'EMAIL_STORE';
export const REQUEST_EXCHANGE_RATES = 'REQUEST_EXCHANGE_RATE';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const storeEmail = (email) => ({
  type: EMAIL_STORE,
  email,
});

const requestExchangeRates = () => ({
  type: REQUEST_EXCHANGE_RATES });

const storeExpenses = (expenses, exchangeRates) => ({
  type: SAVE_EXPENSE,
  expenses: { ...expenses, exchangeRates },
});

export function fetchExchangeRatesAndStoreExpenses(expenses) {
  return (dispatch) => {
    dispatch(requestExchangeRates());
    return awesomeAPI()
      .then((exchangeRates) => dispatch(storeExpenses(expenses, exchangeRates)));
  };
}
