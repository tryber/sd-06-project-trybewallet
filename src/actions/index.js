import { response } from '../tests/mockData';

export const UPDATE = 'UPDATE';
export const SAVE = 'SAVE';
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

export const saveMail = (email) => ({
  type: UPDATE,
  email,
});

const isFetching = () => ({
  type: LOADING,
});

const successFetch = (data) => ({
  type: SUCCESS,
  data,
});

export const saveExpense = (expenses) => ({
  type: SAVE,
  expenses,
});

// const errorFetch = () => ({
//   type: ERROR,
// });

export async function fetchAPI(dispatch) {
  dispatch(isFetching);
  // const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  // const data = await response.json();
  // dispatch(successFetch(data));
  const data = await Promise.resolve(response);
  dispatch(successFetch(data));
}
