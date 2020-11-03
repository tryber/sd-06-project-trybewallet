export const LOGIN = 'LOGIN';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const fetchCurrencies = (json) => ({
  type: FETCH_CURRENCIES,
  json,
});

export async function fetchAwesomeAPI() {
  return ((dispatch) => (
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((json) => dispatch(fetchCurrencies(json)))
  ));
}
