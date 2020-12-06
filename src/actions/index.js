import apiCurrencies from '../services/dataAPI';

export const LOGIN = 'LOGIN';
export const RESPONSE = 'RESPONSE';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const responseAPI = (prices) => (
  {
    type: RESPONSE,
    prices,
  });

export const fetchCurrenciesAction = () => (
  async (dispatch) => {
    const aux = await apiCurrencies();
    delete aux.USDT;
    dispatch(responseAPI(aux));
  }
);

export const expenseAction = (exchangeRates, expense) => ({
  type: ADD_EXPENSE,
  expense,
  exchangeRates,
});

export const ratesList = (expense) => async (dispatch) => {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  const returnAPI = await fetch(endpoint);
  const exchangeRates = await returnAPI.json();
  dispatch(expenseAction(exchangeRates, expense));
};
