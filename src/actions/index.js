import { response } from '../tests/mockData';

window.fetch = async () => ({ json: () => Promise.resolve(response) });

export const saveUser = (userEmail) => ({
  type: 'SAVE_USER',
  payload: userEmail,
});

export const saveCurrency = (currencies) => ({
  type: 'SAVE_CURRENCY',
  payload: currencies,
});

// export function fetchApi() {
//   const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const currencies = await responseFromAPI.json();
//   dispatch(saveCurrency(currencies));
// }

export const thunkCurrencies = () => async (dispatch) => {
  const responseFromAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const currencies = await responseFromAPI.json();
  dispatch(saveCurrency(currencies));
}
