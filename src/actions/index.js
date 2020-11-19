import fetchApi from '../data';

export const SAVELOGIN = 'SAVE_LOGIN';
export const OK_CURRENCIES = 'OK_CURRENCIES';
export const EXPENSES = 'EXPENSES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

export const saveLogin = (email) => ({
  type: SAVELOGIN,
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const expensesAdd = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const apiOk = (currencies) => ({
  type: OK_CURRENCIES,
  currencies,
});

export const currencyThunk = () => (dispatch) => {
  fetchApi()
    .then((currencies) => {
      dispatch(apiOk(currencies));
    });
};

export const expensesThunk = (expense) => async (dispatch, getState) => {
  const responseApi = await fetchApi();
  const expensesItens = getState().wallet.expenses;
  let itemId = 0;
  if (expensesItens.length === 0) {
    itemId = 0;
  }
  itemId = expensesItens[expensesItens.length - 1].id + 1;

  const dispExpense = { ...expense, id: itemId, exchangeRates: responseApi };
  dispatch(expensesAdd(dispExpense));
};
