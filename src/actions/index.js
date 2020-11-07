export const EMAIL = 'EMAIL';
export const salveUserEmail = (email) => ({
  type: EMAIL,
  email,
});

export const CURRENCY = 'CURRENCY';
export const currencyAction = (currency) => ({
  type: CURRENCY,
  currency,
});

export const EXPENSES = 'EXPENSES';
export const addExpense = (expenses) => ({
  type: EXPENSES,
  expenses,
});

export function newCurrency(expense) {
  return async (dispatch) => {
    const getCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await getCurrencies.json();
    const allExpenses = { ...expense, exchangeRates: currencies };
    dispatch(addExpense(allExpenses));
  };
}

export function fetchCurrency() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((response) => dispatch(currencyAction(response)));
  };
}
