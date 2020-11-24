export const EMAIL = 'EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const CURRENCY = 'CURRENCY';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const currencyCode = (code) => ({ type: CURRENCY, code });

export const expenseAction = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export function fetchApi() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const currResponse = await fetch(endpoint);
    const currJson = await currResponse.json();
    dispatch(currencyCode(currJson));
  };
}

export const action = (value) => ({ type: EMAIL, value });
