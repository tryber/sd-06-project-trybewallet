import getCurrency from '../services/currencyAPI';

export const START_LOGIN = 'START_LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const SUCESS_CURRENCY = 'SUCESS_CURRENCY';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';

export const startLogin = (email) => ({
  type: START_LOGIN,
  email,
});

const sucessCurrency = (currencies) => ({
  type: SUCESS_CURRENCY,
  currencies,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const deleteExpenses = (expenseId) => ({
  type: DELETE_EXPENSES,
  expenseId,
});

export const fetchCurrency = () => async (dispatch) => {
  const responseCurrency = await getCurrency();
  dispatch(sucessCurrency(responseCurrency));
};

export const addExpenseThunk = (expense) => async (dispatch) => {
  const responseCurrency = await getCurrency();
  const expenseState = {
    ...expense,
    exchangeRates: responseCurrency,
  };
  dispatch(addExpense(expenseState));
};
