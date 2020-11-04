import { fetchAPI } from '../services/API';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSES = 'FORM_ENTRIES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const wallet = (expense) => ({
  type: ADD_EXPENSES,
  expense,
});

export const addExpenseThunk = (expense) => async (dispatch) => {
  const reponse = await fetchAPI();
  dispatch(wallet(({ ...expense, exchangeRates: reponse })));
};
