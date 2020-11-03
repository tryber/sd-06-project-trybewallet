export const LOGIN = 'LOGIN';
export const EXPENSES = 'EXPENSES';
export const CURRENCIES = 'CURRENCIES';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const expensesAction = (expenses) => ({
  type: EXPENSES,
  expenses,
});
export const currenciesAction = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

// action -> objeto com a propriedade type e mais qualquer outra chave que eu quiser
// email->e-mail
export const currencyAPI = () => async (dispatch) => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const retorno = await fetchCurrencies.json();
  const currency = Object.keys(retorno);
  const currencies = currency.filter((cur) => cur !== 'USDT');
  return dispatch(currenciesAction(currencies));
};
