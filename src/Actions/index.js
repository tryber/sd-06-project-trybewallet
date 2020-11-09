import Api from '../services/currenciesApi';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const GET_DATA = 'GET_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const EDIT_DATA = 'EDIT_DATA';
export const SAVE_EXPENSES = 'SAVE_EXPENESES';



export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  email,
});

function saveExpenses(expese) {
  return {
    type: SAVE_EXPENSES,
    expese,
  }
}

export const editData = (expese) => ({
  type: EDIT_DATA,
  expese,
})

export const deleteData = (expese) => ({
  type: DELETE_DATA,
  expese,
})

function getData(json) {
  return {
    type: GET_DATA,
    json,
  }
}

export function fetchData() {
  return (dispatch) => { Api().then((json) => dispatch(getData(json))); };
}

export function newExpense(expense) {
  return async (dispatch, getState) => {
    const { wallet: { expenses } } = getState();
    const id = expenses.length;
    const exchangeRates = await Api();
    dispatch(saveExpenses({...expense, exchangeRates, id}));
  };
}
