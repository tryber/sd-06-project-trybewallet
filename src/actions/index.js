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

export const requestCurrencyOk = (currency) => ({
  type: RECEIVE_CURRENCY_OK,
  currency,
});

export const currenciesThunk = () => (dispatch) => {
  getAllCurrencies()
    .then((currencies) => dispatch(resquestCurrencyOk(currencies)));
};

export const expensesThunk = (expense) => async (dispatch, getState) => {
  const apiResponse = await getAllCurrencies();
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
