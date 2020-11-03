export const LOGIN = 'LOGIN';
export const SELECT_CURRENCY = 'SELECT_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const selectCurrencies = (currencies) => ({
  type: SELECT_CURRENCY,
  currencies,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const actionLogin = (email) => ({ type: LOGIN, email });

export const fetchCurrencies = () => async (dispatch) => {
  const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseFromAPI.json();
  dispatch(selectCurrencies(currencies));
};

// export const fetchAddCurrency = (expense) => async (dispatch, getState) => {
//   const { wallet: { expenses } } = getState();
//   const INITIAL_ID = 0;
//   const nextID = expenses.length ? expenses[expenses.length - 1].id + 1 : INITIAL_ID;
//   const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const exchangeRates = await responseFromAPI.json();
//   const newExpense = { id: nextID, ...expense, exchangeRates };
//   dispatch(addExpense(newExpense));
// };
