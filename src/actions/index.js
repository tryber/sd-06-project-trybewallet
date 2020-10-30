import currencyApi from '../services/currencyApi';

export const SAVE_USER = 'SAVE_USER';

export const saveUser = (userEmail) => ({
  type: SAVE_USER,
  payload: userEmail,
});

export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES,
  payload,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await currencyApi();
    const currencies = Object.keys(response);
    dispatch(saveCurrencies(currencies));
  };
}

export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveExpense = (expenseData, currencies) => ({
  type: SAVE_EXPENSE,
  payload: { ...expenseData, exchangeRates: currencies },
});

export function registerExpense(expenseData) {
  return async (dispatch) => {
    const exchangeRates = await currencyApi();
    dispatch(saveExpense(expenseData, exchangeRates));
  };
}

export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const deleteExpense = (expenseId) => ({
  type: DELETE_EXPENSE,
  expenseId,
});
