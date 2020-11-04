export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSES = 'REMOVE_EXPENSES';
export const REQUEST_CURRENCIES_PRICE = 'REQUEST_CURRENCIES_PRICE';
export const RECEIVE_CURRENCIES_PRICE = 'RECEIVE_CURRENCIES_PRICE';
export const EDIT_ENTRY = 'EDIT_ENTRY';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_EACH_FIELD_EXPENSE_BAR = 'EDIT_EACH_FIELD_EXPENSE_BAR';
const API_CURRENCIES_PRICE = 'https://economia.awesomeapi.com.br/json/all';

export const addEmailToState = (email, loggedIn) => (
  {
    type: ADD_EMAIL,
    email,
    loggedIn,
  });

export const addExpensesToState = (payload, totalExpenses) => (
  {
    type: ADD_EXPENSES,
    payload,
    totalExpenses,
  });

export const editActiveExpense = () => (
  {
    type: EDIT_EXPENSE,
  });

export const removeExpense = (index) => (
  {
    type: REMOVE_EXPENSES,
    index,
  });

export const requestPrices = () => (
  {
    type: REQUEST_CURRENCIES_PRICE,
  });

export const receivePrices = (prices) => (
  {
    type: RECEIVE_CURRENCIES_PRICE,
    prices,
  });

export const fetchCurrenciesPrice = () => async (dispatch) => {
  dispatch(requestPrices());
  const fetchPrices = await fetch(API_CURRENCIES_PRICE);
  const jsonPrices = await fetchPrices.json();
  delete jsonPrices.USDT;
  return dispatch(receivePrices(jsonPrices));
};

export const editEntry = (boolValue, index) => (
  {
    type: EDIT_ENTRY,
    boolValue,
    index,
  });

export const editExpenseField = (key, value) => (
  {
    type: EDIT_EACH_FIELD_EXPENSE_BAR,
    key,
    value,
  });
