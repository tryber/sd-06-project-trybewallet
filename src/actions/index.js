export const EMAIL = 'EMAIL';
export const CURRENCY = 'CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const loginAction = (payload) => ({
  type: EMAIL,
  payload,
});

export const fetchAction = (currencies) => ({
  type: CURRENCY,
  currencies,
});

export const addAction = (expenses) => ({
  type: ADD_EXPENSE,
  expenses,
});

export const thunkCurrencyAPI = () => async (dispatch) => {
  const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await fetchAPI.json();
  const currency = Object.keys(response);
  const filteredCurrencies = currency.filter((cur) => cur !== 'USDT');
  dispatch(fetchAction(filteredCurrencies));
};

export const thunkExpenses = (expenseObj) => async (dispatch, getState) => {
  const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await fetchAPI.json();
  const { expenses } = getState().wallet;
  let idUser = 0;

  if (expenses.length === 0) {
    idUser = 0;
  } else {
    idUser = expenses[expenses.length - 1].id + 1;
  }

  const exp = { ...expenseObj, id: idUser, exchangeRates: response };
  dispatch(addAction(exp));
};
