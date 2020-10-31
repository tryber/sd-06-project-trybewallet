// caso a API caia
// import { response } from '';
// window.fetch = async () => ({ json: () => Promise.resolve(response) });

export const LOGIN = 'LOGIN';
export const CURRENCY_FETCH = 'CURRENCY_FETCH';
export const ADD_NEW_EXPENSE = 'ADD_NEW_EXPENSE';

export const loginUsers = (email) => ({
  type: LOGIN,
  email,
});

export const currenciesFetch = (currencies) => ({
  type: CURRENCY_FETCH,
  currencies,
});

export const addNewExpense = (expenses) => ({
  type: 'ADD_NEW_EXPENSE',
  expenses,
});

export const thunkWallet = () => async (dispatch) => {
  const responseApi = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseApi.json();
  dispatch(currenciesFetch(currencies));
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

/*
caso a API caia, solução do Ícaro
      export function fetchApi() {
        const responseApi = await fetch('https://economia.awesomeapi.com.br/json/all');
        const currencies = await responseApi.json();
        dispatch(currenciesFetch(currencies));
      }
*/
