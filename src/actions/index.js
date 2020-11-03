import fetchAPI from '../services';

export const CURRENCIES = 'CURRENCIES';
export const success = (currencies) => ({ type: CURRENCIES, currencies });

export const LOGIN = 'LOGIN';
export const login = (email) => ({ type: LOGIN, email });

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const addExpense = (expense) => ({ type: ADD_EXPENSE, expense });

export const FILTERED_EXPENSES = 'FILTERED_EXPENSES';
export const filteredExpenses = (expensesFiltered) => (
  { type: FILTERED_EXPENSES, expensesFiltered }
);

export function fetchCurrencies() {
  return async (dispatch) => {
    const apiResponse = await fetchAPI();
    const currencies = Object.keys(apiResponse);
    const currenciesWithoutUSDT = currencies.filter((coin) => coin !== 'USDT');
    dispatch(success(currenciesWithoutUSDT));
  };
}

export function addExpenseThunk(userExpense) {
  return async (dispatch, getState) => {
    const apiResponse = await fetchAPI();
    const { expenses } = getState().wallet;
    let idExpense = 0;
    if (expenses.length === 0) {
      idExpense = 0;
    } else {
      idExpense = expenses[expenses.length - 1].id + 1;
    }
    const expense = { ...userExpense, id: idExpense, exchangeRates: apiResponse };
    dispatch(addExpense(expense));
  };
}

export function deleteExpense(idExpense) {
  return (dispatch, getState) => {
    const { expenses } = getState().wallet;
    const expensesFiltered = expenses
      .filter((expense) => expense.id !== idExpense);
    dispatch(filteredExpenses(expensesFiltered));
  };
}
