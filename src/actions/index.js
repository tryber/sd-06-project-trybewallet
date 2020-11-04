// Coloque aqui suas actions
import fetchApi from '../services/server';

export const LOGIN = 'LOGIN';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const RECEIVE_CURRENCY_OK = 'RECEIVE_CURRENCY_OK';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const resquestCurrencyOk = (currencies) => ({
  type: RECEIVE_CURRENCY_OK,
  currencies,
});

export const currenciesThunk = () => (dispatch) => {
  fetchApi()
    .then((currencies) => dispatch(resquestCurrencyOk(currencies)));
};

export const expensesThunk = (expense) => async (dispatch, getState) => {
  const apiResponse = await fetchApi();
  const itemExpenses = getState().wallet.expenses;
  let idItem = 0;
  if (itemExpenses.length === 0) {
    idItem = 0;
  } else {
    idItem = itemExpenses[itemExpenses.length - 1].id + 1;
  }
  const upExpense = { ...expense, id: idItem, exchangeRates: apiResponse };
  dispatch(addExpenses(upExpense));
};
