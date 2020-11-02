// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export function requestAPI() {
  return async (dispatch) => {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await fetchAPI.json();

    dispatch(requestAPI(result));
  };
}
