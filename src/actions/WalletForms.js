export const CURRENCIES_API = 'CURRENCIES_API';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

const apiFetch = (currencies) => ({
  type: CURRENCIES_API,
  currencies,
});

export const addExpense = (expense) => (
  async (dispatch) => {
    const response = (await (await fetch('https://economia.awesomeapi.com.br/json/all')).json());
    expense.exchangeRates = response;
    const currentExchangeRate = response[expense.currency].ask;

    const convertedExpense = currentExchangeRate * expense.value;

    dispatch({
      type: ADD_EXPENSES,
      expense,
      convertedValue: convertedExpense,
    });
  }
);

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export default apiFetch;
