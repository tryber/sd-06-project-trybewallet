/* eslint-disable no-unused-expressions */
// Coloque aqui suas actions
const USER_LOGIN = 'USER_LOGIN';
const ADD_EXPENSE = 'ADD_EXPENSE';
const FETCHCURRENCSUCCESS = 'FETCHCURRENCSUCCESS';

export const user = (email) => ({
  type: USER_LOGIN, email,
});
export const walletfunc = (payload) => ({
  type: ADD_EXPENSE, payload,
});
function fecthCurrenc(json) {
  return { type: FETCHCURRENCSUCCESS, payload: json };
}

export const addExpenseThunk = (expenses) => {
  //
  async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(walletfunc({ ...expenses, exchangeRates: data }));
  };
};

export function walletAPI() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((r) => r.json()
      .then((json) => dispatch(fecthCurrenc(json))));
}
