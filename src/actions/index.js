// Coloque aqui suas actions
const ADD_USER = 'ADD_USER';
const REQUEST_DATA = 'REQUEST_DATA';
const SUCCESS = 'SUCCESS';
const SAVE_EXPENSE = 'SAVE_EXPENSE';
const DEL_EXPENSE = 'DEL_EXPENSE';

export function addUser(email) {
  return { type: ADD_USER, payload: email };
}

function requestData() {
  return { type: REQUEST_DATA };
}

function success(data) {
  return { type: SUCCESS, data };
}

export function saveExpense(expenses) {
  return { type: SAVE_EXPENSE, expenses };
}

export function delExpense(expenses) {
  return { type: DEL_EXPENSE, expenses };
}

export async function fetchData(dispatch) {
  dispatch(requestData);
  const res = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await res.json();
  dispatch(success(data));
}
