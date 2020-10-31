import fetchApi from '../services/api';

export const SAVE_EMAIL = 'SAVE_EMAIL';

export const SAVE_CURRENCY = 'SAVE_CURRENCY';

export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveCurrency = (currencies) => ({
  type: SAVE_CURRENCY,
  currencies,
});

export const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});

export function thunkCurrency() {
  return (dispatch) => (
    fetchApi()
      .then((currencies) => dispatch(saveCurrency(currencies)))
  );
}

export function addExpenseThunk(userExpense) {
  return async (dispatch, getState) => {
    const apiResponse = await fetchApi();
    const { expenses } = getState().wallet;
    let idExpense = 0;
    if (expenses.length === 0) {
      idExpense = 0;
    } else {
      idExpense = expenses[expenses.length - 1].id + 1;
    }
    const newExpense = { ...userExpense, id: idExpense, exchangeRates: apiResponse };
    return (dispatch(saveExpense(newExpense)));
  };
}
