export const UPDATE = 'UPDATE';
export const SAVE = 'SAVE';
export const DELETE = 'DELETE';
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

export const deleteExpense = (expenses) => ({
  type: DELETE,
  expenses,
});

// const errorFetch = () => ({
//   type: ERROR,
// });

// window.fetch = async () => ({ json: () => Promise.resolve(response) });

export async function fetchAPI(dispatch) {
  dispatch(isFetching);
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  dispatch(successFetch(data));
  // const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  // const resp = await fetch(endpoint);
  // const data = await resp.json();
  // const data = await Promise.resolve(response);
}
