// Coloque aqui suas actions
// import { response } from '../tests/mockData';
// window.fetch = async () => ({ json: () => Promise.resolve(response) });

export const LOGIN = 'LOGIN';
export const CURRENCIES_FECTH_SUCESS = 'CURRENCY_FETCH_SUCESS';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';

export const login = (email) => ({
  type: 'LOGIN',
  email,
});

export const currenciesFetchSucess = (currencies) => ({
  type: 'CURRENCY_FETCH_SUCESS',
  currencies,
});

export const addNewExpense = (expenses) => ({
  type: 'ADD_NEW_EXPENSE',
  expenses,
});

// export async function fetchApi() {
//   const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const currencies = await responseFromAPI.json();
//   dispatch(currenciesFetchSucess(currencies));
// }

export const thunkCurrencies = () => async (dispatch) => {
  const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseFromAPI.json();
  dispatch(currenciesFetchSucess(currencies));
};

export const thunkAddANewCurrency = (expense) => async (dispatch, getState) => {
  const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseFromAPI.json();
  const { wallet: { expenses } } = getState();
  const INITIAL_ID = 0;
  const nextID = expenses.length ? expenses[expenses.length - 1].id + 1 : INITIAL_ID;
  const newExpense = { ...expense, id: nextID, exchangeRates: currencies };
  dispatch(addNewExpense(newExpense));
};
