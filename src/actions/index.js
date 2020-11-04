export const LOGIN = 'LOGIN';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const fetchCurrencies = (currencies) => ({
  type: FETCH_CURRENCIES,
  currencies,
});

export function fetchAwesomeAPI() {
  return ((dispatch) => (
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => {
        delete currencies.USDT; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
        return dispatch(fetchCurrencies(currencies));
      })
  ));
}
