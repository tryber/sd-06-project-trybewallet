export const LOGIN = 'LOGIN';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const CURRENCY = 'CURRENCY';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const FILTER_EXPENSE = 'FILTER_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export function userLogin(email) {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
}

export function currenciesGet(currencies) {
  return { type: GET_CURRENCIES,
    payload: {
      currencies,
    },
  };
}

export function fetchCurrencies() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const fetchEndpoint = await fetch(endpoint);
    const result = await fetchEndpoint.json();
    const currencies = Object.keys(result);
    const currenciesWithoutUSDT = currencies.filter((coin) => coin !== 'USDT');
    dispatch(currenciesGet(currenciesWithoutUSDT));
  };
}

function expenseUpdater({ value, description, currency, method, tag, exchangeRates }) {
  return {
    type: CREATE_EXPENSE,
    payload: {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    },
  };
}

export function updateExpenses({ value, description, currency, method, tag }) {
  return (
    async (dispatch) => {
      const endpoint = 'https://economia.awesomeapi.com.br/json/all';
      const fetchEndpoint = await fetch(endpoint);
      const exchangeRates = await fetchEndpoint.json();
      dispatch(expenseUpdater({
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      }));
    }
  );
}

export function filterExpenses(filteredExpense) {
  return {
    type: FILTER_EXPENSE,
    filteredExpense,
  };
}

export function deleteExpenses(expenseId) {
  return (dispatch, getState) => {
    const { expenses } = getState().wallet;
    const filteredExpense = expenses.filter((expense) => expense.id !== expenseId);
    dispatch(filterExpenses(filteredExpense));
  };
}

export function editingExpense(expenseId) {
  return {
    type: EDITING_EXPENSE,
    expenseId,

  };
}

export function editExpense(expense) {
  return (dispatch, getState) => {
    const { expenses } = getState().wallet;
    const expensesFiltered = expenses
      .map((item) => {
        if (item.id === expense.id) return expense;
        return item;
      });
    const removeExpenseForEdition = '';
    dispatch(filterExpenses(expensesFiltered));
    dispatch(editingExpense(removeExpenseForEdition));
  };
}
