import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

export const login = (email) => ({
  type: 'ACTION_LOGIN_SUCCESS',
  email,
});

export const getCoin = (currency) => ({
  type: 'GET_COIN',
  currency,
});

export const addExpend = (expenses) => ({
  type: 'ADD_EXPEND',
  expenses,
});

export const addSumValue = (value) => ({
  type: 'ADD_SUM_VALUE',
  value,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const responseData = await fetch('https://economia.awesomeapi.com.br/json/all');
    const responseJSON = await responseData.json();
    dispatch(getCoin(responseJSON));
  };
}
