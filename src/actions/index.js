export const EMAIL = 'EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const CURRENCY = 'CURRENCY';

const currencyCode = (code) => ({ type: CURRENCY, code });

export const expenseAction = (expense) => ({
  type: ADD_EXPENSE,
  expense,
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
