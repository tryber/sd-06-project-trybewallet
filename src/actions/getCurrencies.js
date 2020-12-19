export const GET_CURRENCIES = 'GET_CURRENCIES';

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});
