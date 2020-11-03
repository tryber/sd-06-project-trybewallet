import { response } from '../tests/mockData';

export const LOGIN = 'LOGIN';
export const GET_CURRENCY = 'GET_CURRENCY';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const loginSucess = (email) => (
  { type: LOGIN, payload: email }
);

function getCurrency(currencies) {
  return { type: GET_CURRENCY, currencies };
}

window.fetch = async () => ({ json: () => Promise.resolve(response) });

export function fetchApi() {
  return async (dispatch) => {
    const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJSON = await responseAPI.json();
    const currencies = Object.keys(responseJSON);

    dispatch(getCurrency(currencies));
  };
}

export const saveExpenses = (expenses) => (
  { type: SAVE_EXPENSES, expenses }
);

export function fetchRates(data) {
  return async (dispatch) => {
    const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJSON = await responseAPI.json();
    const expenses = { ...data, exchangeRates: responseJSON };

    dispatch(saveExpenses(expenses));
  };
}
