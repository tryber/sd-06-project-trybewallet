export const newEmail = (value) => ({
  type: 'NEW_USER',
  value,
});

export const delEmail = (value) => ({
  type: 'REMOVE_USER',
  value,
});

export const expenses = (payload) => ({
  type: 'NEW_EXPENSES',
  payload,
});

export const fetchCurrencies = (coin) => ({
  type: 'FETCH_CURRENCIES_SUCCESS',
  coin,
});

export default function apiMoney() {
  return async (dispatch) => {
    const moneyResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const cotacaoMoeda = await moneyResponse.json();

    dispatch(fetchCurrencies(cotacaoMoeda));
  };
}
