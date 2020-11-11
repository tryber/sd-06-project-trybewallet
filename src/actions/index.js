import fetchApi from '../services/economiaAPI';

export const HANDLE_USER = 'HANDLE_USER';
const setEmailForm = (email) => ({
  type: HANDLE_USER,
  email,
});

export default setEmailForm;

export const CURRENCY_SUCCESS = 'CURRENCY_SUCCESS';
export const currencySuccess = (currencies) => ({
  type: CURRENCY_SUCCESS,
  currencies,
});

export function currencyThunk() {
  return async (dispatch) => {
    const apiRequest = await fetchApi();
    const currencies = Object.keys(apiRequest);
    const filterCurrency = currencies.filter((currency) => currency !== 'USDT');
    dispatch(currencySuccess(filterCurrency));
  };
}

export const HANDLE_EXPENSE = 'HANDLE_EXPENSE';
export const addExpense = (expense) => ({
  type: HANDLE_EXPENSE,
  expense,
});

export function addThunk(inputExpense) {
  return async (dispatch, getState) => {
    const apiRequest = await fetchApi();
    const { expenses } = getState().wallet;
    let expenseId = 0;
    if (expenses.length === 0) {
      expenseId = 0;
    } else {
      expenseId = expenses[expenses.length - 1].id + 1;
    }
    const newExpense = {
      ...inputExpense,
      id: expenseId,
      exchangeRates: apiRequest,
    };
    return (dispatch(addExpense(newExpense)));
  };
}

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const deleteSelected = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const editSelected = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
});

export const GET_ID = 'GET_EDIT';
export const idSelected = (id) => ({
  type: GET_ID,
  id,
});
