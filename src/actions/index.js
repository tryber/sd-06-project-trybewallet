import AwesomeAPI from '../services/AwesomeAPI';

// actions' types variables
export const USER_EMAIL = 'USER_EMAIL';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const getUserEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const storeExpenses = (expenses, exchangeRates) => ({
  type: SAVE_EXPENSE,
  expenses: { ...expenses, exchangeRates },
});

export function getExchangeRateToStoreExpenses(expenses) {
  return (dispatch) => AwesomeAPI()
    .then((exchangeRates) => dispatch(storeExpenses(expenses, exchangeRates)));
}
