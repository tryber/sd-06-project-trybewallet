import Api from '../services/currenciesApi';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const GET_DATA = 'GET_DATA';

export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  email,
});

function saveExpenses(expense) {
  return { type: SAVE_EXPENSES, expense };
}

function getApi(json) {
  return { type: GET_DATA, json };
}

export function fetchData() {
  return (dispatch) => { Api().then((json) => dispatch(getApi(json))); };
}

export function newExpense(expense) {
  return async (dispatch, getState) => {
    const { wallet: { expenses } } = getState();
    const id = expenses.length;
    const exchangeRates = await Api();
    dispatch(saveExpenses({ ...expense, exchangeRates, id }));
  };
}
