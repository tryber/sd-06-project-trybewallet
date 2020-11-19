export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export { ADD_USER_EMAIL, loginUser } from './ADD_USER_EMAIL';
export { REMOVE_EXPENSE, removeExpense } from './REMOVE_EXPENSE';
export { TOOGLE_EDIT_MODE, toogleEdit } from './TOOGLE_EDIT_MODE';
export { SAVE_EDITED_EXPENSE, saveEdited } from './SAVE_EDITED_EXPENSE';

const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: {
    currencies,
  },
});

const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: {
    expense,
  },
});

export function storeCurrencies(currencies) {
  return (dispatch) => {
    dispatch(addCurrencies(currencies));
  };
}

export function storeExpense(expense) {
  return (dispatch) => {
    dispatch(addExpense(expense));
  };
}
