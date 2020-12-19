export const CURRENCIES_API = 'CURRENCIES_API';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_ATTRIBUTE = 'EDIT_ATTRIBUTE';
export const REPLACE_EXPENSE = 'REPLACE_EXPENSE';

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
      edit: false,
    });
  }
);

export const removeExpense = (id) => ({
  type: REMOVE_EXPENSE,
  id,
});

export const replaceExpense = (expense) => ({
  type: REPLACE_EXPENSE,
  expense,
});

export const editExpense = (expense) => ({
  type: EDIT_EXPENSE,
  expense,
  edit: true,
});

export const editAttribute = (target) => ({
  type: EDIT_ATTRIBUTE,
  name: target.name,
  value: target.value,
});

export default apiFetch;
