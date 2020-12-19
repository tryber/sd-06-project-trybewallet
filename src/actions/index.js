import currencyApi from '../services/fetchApi';

export const login = (email) => ({
  type: 'LOGIN',
  email,
});

export const saveCurrencies = (currencies) => ({
  type: 'SAVE_CURRENCIES',
  currencies,
});

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await currencyApi();
    const currencies = Object.keys(response);
    dispatch(saveCurrencies(currencies));
  };
}

export const expensesAction = (expense) => ({
  type: 'SAVE_EXPENSES',
  expense,
});

export function fetchExchangeRates(expenseData) {
  return async (dispatch) => {
    const currencies = await currencyApi();
    const expense = { ...expenseData, exchangeRates: currencies };
    dispatch(expensesAction(expense));
  };
}

export const deleteExpense = (expenseId) => ({
  type: 'DELETE_EXPENSE',
  expenseId,
});
