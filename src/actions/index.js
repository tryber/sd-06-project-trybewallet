// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';
export const DELETE = 'DELETE';
export const EDITING = 'EDITING';
export const NEW_EDITING = 'NEW_EDITING';

export const saveEmail = (value) => ({
  type: EMAIL,
  value,
});

export const saveCurrency = (currency) => ({
  type: CURRENCY,
  currency,
});

export const saveExpense = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export const deleteExpense = (id) => ({
  type: DELETE,
  id,
});

export const editExpense = (id) => ({
  type: EDITING,
  id,
});

export const editNewExpense = (expense) => ({
  type: NEW_EDITING,
  expense,
});

export const fetchCurrencyThunk = () => async (dispatch) => {
  const fetchCurrency = await fetch('https://economia.awesomeapi.com.br/json/all');
  const fetchCurrencyResponse = await fetchCurrency.json();
  dispatch(saveCurrency(fetchCurrencyResponse));
};

export const fetchExpenseThunk = (expense) => async (dispatch) => {
  const fetchExpenseRate = await fetch('https://economia.awesomeapi.com.br/json/all');
  const fetchExpenseRateResponse = await fetchExpenseRate.json();
  const allExpense = { ...expense, exchangeRates: fetchExpenseRateResponse };
  dispatch(saveExpense(allExpense));
};
