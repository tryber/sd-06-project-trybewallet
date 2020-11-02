export const USER_EMAIL = 'USER_EMAIL';
export const WALLET_CHANGES = 'WALLET_CHANGES';
export const GET_CURRENCY = 'GET_CURRENCY';

export const addUserEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const catchInputEntries = (expenses) => ({
  type: WALLET_CHANGES,
  payload: {
    expenses,
  },
});

const currenciesFetch = (currencies) => ({
  type: GET_CURRENCY,
  payload: {
    currencies,
  },
});

export const getCurrencies = () => async (dispatch) => {
  const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseFromAPI.json();
  dispatch(currenciesFetch(currencies));
};
