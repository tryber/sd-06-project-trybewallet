export const EMAIL = 'ADD_EMAIL';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';

export const saveUserEmail = (value) => ({
  type: EMAIL,
  value,
});

export const currencyAction = (currency) => ({
  type: CURRENCY,
  currency,
});

export const addExpense = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export function fetchCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => dispatch(currencyAction(response)));
  };
}

export function newCurrency(expense) {
  return async (dispatch) => {
    const getCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await getCurrencies.json();
    const allExpenses = { ...expense, exchangeRates: currencies };
    dispatch(addExpense(allExpenses));
  };
}
