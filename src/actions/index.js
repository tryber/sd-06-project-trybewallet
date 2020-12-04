// Coloque aqui suas actions
export const EMAIL = 'EMAIL';
export const CURRENCY = 'CURRENCY';
export const EXPENSES = 'EXPENSES';

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

export const fetchCurrencyThunk = () => async (dispatch) => {
  const fetchCurrency = await fetch('https://economia.awesomeapi.com.br/json/all');
  const fetchCurrencyResponse = await fetchCurrency.json();
  dispatch(saveCurrency(fetchCurrencyResponse));
};

export const fetchExpenseThunk = (expense) => {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json)
      .then((response) => {
        const allExpenses = { ...expense, exchangeRates: response };
        dispatch(allExpenses);
      });
  };
};
