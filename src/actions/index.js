export const EMAIL = 'EMAIL';
export const CURRENCY = 'CURRENCY';

export const loginAction = (payload) => ({
  type: EMAIL,
  payload,
});

export const fetchAction = (data) => ({
  type: CURRENCY,
  data,
});

export function fetchApi() {
  return (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    return fetch(endpoint)
      .then((response) => response.json())
      .then((data) => dispatch(fetchAction(data)));
  };
}
