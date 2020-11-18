import fetchAPI from '../services';

export const LOGIN = 'LOGIN';
export const SELECT_CURRENCY = 'SELECT_CURRENCY';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const FILTERED_EXPENSES = 'FILTERED_EXPENSES';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';

export const selectCurrencies = (currencies) => ({
  type: SELECT_CURRENCY,
  currencies,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const filteredExpenses = (expensesFiltered) => ({
  type: FILTERED_EXPENSES,
  expensesFiltered,
});

export const actionLogin = (email) => ({ type: LOGIN, email });

export const editingExpense = (expenseId) => ({ type: EDITING_EXPENSE, expenseId });

export const fetchCurrencies = () => async (dispatch) => {
  const responseFromAPI = await fetchAPI();
  const currencies = Object.keys(responseFromAPI);
  const currenciesUSDT = currencies.filter((coin) => coin !== 'USDT');
  dispatch(selectCurrencies(currenciesUSDT));
};

// lógica do Gui, em auxílio no plantão do Ícaro
export const fetchAddCurrency = (expenseUser) => async (dispatch, getState) => {
  const { expenses } = getState().wallet;
  const apiRequest = await fetchAPI();
  let idExpense = 0;
  if (expenses.length === 0) {
    idExpense = 0;
  } else {
    idExpense = expenses[expenses.length - 1].id + 1;
  }
  const saveExpense = {
    id: idExpense,
    ...expenseUser,
    exchangeRates: apiRequest,
  };
  dispatch(addExpenses(saveExpense));
};

// tentando já passar próximo requisito
export function deleteExpense(expenseId) {
  return (dispatch, getState) => {
    const { expenses } = getState().wallet;
    const expensesFiltered = expenses.filter(
      (expense) => expense.id !== expenseId,
    );
    dispatch(filteredExpenses(expensesFiltered));
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
    dispatch(filteredExpenses(expensesFiltered));
    dispatch(editingExpense(removeExpenseForEdition));
  };
}
