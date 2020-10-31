export const LOGIN = 'LOGIN';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';

// Coloque aqui suas actions
// Funções que retornam objetos

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const currencyAction = (currency) => ({
  type: CURRENCY,
  currency,
});

export const addExpense = (expense) => ({
  type: EXPENSES,
  expense,
});

export const newCurrency = (expense) => async (dispatch, getState) => {
  const { wallet: { expenses } } = getState();
  const firstId = 0;
  const nextId = expenses.length ? expenses[expenses.length - 1].id + 1 : firstId;
  const apiRequest = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await apiRequest.json();
  const newExpanse = { ...expense, exchangeRates, id: nextId };
  dispatch(addExpense(newExpanse));
};

export function fetchCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => dispatch(currencyAction(response)));
  };
}
