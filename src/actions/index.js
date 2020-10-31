export const EMAIL = 'EMAIL';
export const CURRENCY = 'CURRENCY';

export const loginAction = (payload) => ({
  type: EMAIL,
  payload,
});

export const fetchAction = (currencies) => ({
  type: CURRENCY,
  currencies,
});

export const thunkCurrencyAPI = () => async (dispatch) => {
  const responseAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currency = await responseAPI.json();
  dispatch(fetchAction(currency));
};
