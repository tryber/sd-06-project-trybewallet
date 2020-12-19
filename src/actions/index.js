export const UPDATE = 'UPDATE';
export const SAVE = 'SAVE';
export const CHANGE = 'CHANGE';
export const SUCCESS = 'SUCCESS';

export const saveMail = (email) => ({
  type: UPDATE,
  email,
});

const successFetch = (data) => ({
  type: SUCCESS,
  data,
});

export const saveExpense = (expenses) => ({
  type: SAVE,
  expenses,
});

export const changeExpense = (expenses) => ({
  type: CHANGE,
  expenses,
});

export async function fetchAPI(dispatch) {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(successFetch(data));
}
