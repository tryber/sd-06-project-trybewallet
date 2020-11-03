import fetchAPI from '../services/fetchAPI';

export const EMAIL_INPUT = 'EMAIL_INPUT';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const emailSaveToState = (email) => ({
  type: EMAIL_INPUT,
  email,
});

export const onFetchSuccess = (currencies) => ({
  type: FETCH_SUCCESS,
  currencies,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export function fetchCurrenciesAPI() {
  return async (dispatch) => {
    const response = await fetchAPI();
    //  dispatch(addExpenses(response));
    const result = Object.keys(response).filter((e) => e !== 'USDT');
    dispatch(onFetchSuccess(result));
  };
}

export const fetchAddExpenses = (expense) => async (dispatch, getState) => {
  const { wallet: { expenses } } = getState();
  const exchangeRates = await fetchAPI();
  const addExpense = { id: expenses.length, ...expense, exchangeRates };
  dispatch(addExpenses(addExpense));
};
