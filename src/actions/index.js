export const actionLogin = (email) => ({
  type: 'LOGIN',
  email,
});

export const changeCurrency = (currencies) => ({
  type: 'CURRENCY',
  currencies,
});

export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const editExpense = (expenses) => ({
  type: 'EDIT',
  expenses,
});

export const getCurrencies = () => async (dispatch) => {
  const result = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await result.json();
  dispatch(changeCurrency(data));
};

export const addExpenseLong = (expense) => async (dispatch) => {
  const result = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await result.json();
  const completeExpense = { ...expense, exchangeRates: data };
  dispatch(addExpense(completeExpense));
};
