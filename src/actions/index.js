import Api from '../services/currencisAPI';

export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const GET_OBJE = 'GET_OBJE';
export const DELETE_OBJE = 'DELETE_OBJE';
export const EDIT_OBJE = 'EDIT_OBJE';

export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  email,
});

function saveExpenses(expense) {
  return { type: SAVE_EXPENSES, expense };
}

function getApi(json) {
  return { type: GET_OBJE, json };
}

export const editObj = (expense) => ({
  type: EDIT_OBJE,
  expense,
});

export const deleteObj = (expense) => ({
  type: DELETE_OBJE,
  expense,
});

export function fetchObj() {
  return (dispatch) => { Api().then((json) => dispatch(getApi(json))); };
}

export function createExpense(expense) {
  return async (dispatch, getState) => {
    const { wallet: { expenses } } = getState();
    const id = expenses.length;
    const exchangeRates = await Api();
    dispatch(saveExpenses({ ...expense, exchangeRates, id }));
  };
}
