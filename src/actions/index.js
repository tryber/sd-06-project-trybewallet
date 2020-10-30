export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

const addUserEmail = (email) => ({
  type: ADD_USER_EMAIL,
  payload: {
    email,
  },
});

const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: {
    currencies,
  },
});

export function loginUser(email) {
  return (dispatch) => {
    dispatch(addUserEmail(email));
  };
}

export function storeCurrencies(currencies) {
  return (dispatch) => {
    dispatch(addCurrencies(currencies));
  };
}
