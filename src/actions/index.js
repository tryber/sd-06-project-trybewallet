import fetchAPI from '../services';

export const LOGIN = 'LOGIN';

export const login = (emailAddress) => ({
  type: LOGIN,
  emailAddress,
});

export const requestOK = (currencies) => ({
  type: 'REQUEST_OK',
  currencies,
});

export const fetchCurrencies = () => (dispatch) => {
  fetchAPI()
    .then((currencies) => dispatch(requestOK(currencies)));
};

export const saveFormExpenses = (exchangeRates, stateExpenses) => ({
  type: 'SAVE_EXPENSES',
  expenses: { ...stateExpenses, exchangeRates },
});

export const fetchAPIExpenses = (stateExpenses) => (dispatch) => {
  fetchAPI()
    // .then((response) => console.log(response))
    .then((response) => dispatch(saveFormExpenses(response, stateExpenses)));
};
