export const EMAIL = 'EMAIL';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';

export const loginAction = (payload) => ({
  type: EMAIL,
  payload,
});

export const fetchAction = (payload) => ({
  type: CURRENCY,
  payload,
});

export const expensesAction = (payload) => ({
  type: EXPENSES,
  payload,
});

export const currencyThunk = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await response.json();
  dispatch(fetchAction(currencies));
};

export const addExpenseThunk = (data) => async (dispatch, getState) => {
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const requestResponse = await request.json();
  const { expenses } = getState().wallet;
  let expenseID = 0;

  if (expenses.length === 0) {
    expenseID = 0;
  } else {
    expenseID = expenses[expenses.length - 1].id + 1;
  }

  const allExpenses = { ...data, id: expenseID, exchangeRates: requestResponse };
  dispatch(expensesAction(allExpenses));
};
