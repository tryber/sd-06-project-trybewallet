// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const login = (email) => ({
  type: LOGIN,
  email,
});

export const FETCH_CURRENCIES = 'FETCH_API';
export const fetchCurrencies = (fetch) => ({
  type: FETCH_CURRENCIES,
  fetch,
});

export default function requestAPI() {
  return async (dispatch) => {
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const result = await fetchAPI.json();

    dispatch(requestAPI(result));
  };
}
