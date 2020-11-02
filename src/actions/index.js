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

export const saveState = (json) => ({
  type: 'SAVE_STATE',
  currencies: json.message,
});

export const fetchCurrencies = () => (dispatch) => {
  fetchAPI()
    .then((currencies) => dispatch(requestOK(currencies)));
};

export const saveExpenses = (expenses) => ({
  type: 'SAVE_EXPENSES',
  expenses,
});
