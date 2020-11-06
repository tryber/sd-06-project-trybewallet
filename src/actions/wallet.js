export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addCurrencies = (currencies) => (
  { type: ADD_CURRENCIES, currencies }
);

export const addExpenses = (expense) => (
  { type: ADD_EXPENSE, expense }
);

export const fetchAPI = () => async (dispatch) => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await (await (await fetch(url)).json());
  dispatch(addCurrencies(response));
  return response;
};
