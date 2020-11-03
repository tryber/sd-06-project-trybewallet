const LOGIN = 'LOGIN';
const REQUEST_API = 'REQUEST_API';
const GET_CURRENCIES = 'GET_CURRENCIES';
const FAILED_REQUEST = 'FAILED_REQUEST';
const ADD_EXPENSE = 'ADD_EXPENSE';
const UPDATE_TOTAL = 'UPDATE_TOTAL';

export const login = (value) => ({ type: LOGIN, value });

export const requestAPI = () => ({ type: REQUEST_API });

export const getCurrencies = (json) => ({ type: GET_CURRENCIES, data: json });

export const failedRequest = (err) => ({ type: FAILED_REQUEST, error: err });

export const addExpense = (data) => ({ type: ADD_EXPENSE, expenseData: data });

export const updateTotal = (total) => ({ type: UPDATE_TOTAL, total });

export function fetchAPI() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI()); // tirar se der bug
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const json = await response.json();
      dispatch(getCurrencies(json));
    } catch (err) {
      dispatch(failedRequest(err)); // tirar se der bug
    }
  };
}
