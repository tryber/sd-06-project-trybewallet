export const LOGIN = 'LOGIN';
export const EXPENSE = 'EXPENSE';
export const CURRENCIES = 'CURRENCIES';

const fetchAPI = async () => {
  const fetchCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  return fetchCurrencies.json();
};

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => async (dispatch) => {
  expense.exchangeRates = await fetchAPI();
  dispatch({
    type: EXPENSE,
    expense,
  });
};

export const addCurrencies = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

// action -> objeto com a propriedade type e mais qualquer outra chave que eu quiser
// email->e-mail

export const currencyAPI = () => async (dispatch) => {
  const APIreturn = await fetchAPI();
  const currencies = Object.keys(APIreturn).filter((key) => key !== 'USDT');
  dispatch(addCurrencies(currencies));
};
// expenses: [{
//   "id": 0,
//   "value": "3",
//   "description": "Hot Dog",
//   "currency": "USD",
//   "method": "Dinheiro",
//   "tag": "Alimentação",
//   "exchangeRates": {
//     "USD": {
//       "code": "USD",
//       "name": "Dólar Comercial",
//       "ask": "5.6208",
//       ...
//     },
//     "CAD": {
//       "code": "CAD",
//       "name": "Dólar Canadense",
//       "ask": "4.2313",
//       ...
//     },
//   }]
// {
//   "USD": {
//     "code":"USD",
//     "codein":"BRL",
//     "name":"Dólar Comercial",
//     "high":"5.6689",
//     "low":"5.6071",
//     "varBid":"-0.0166",
//     "pctChange":"-0.29",
//     "bid":"5.6173",
//     "ask":"5.6183",
//     "timestamp":"1601476370",
//     "create_date":"2020-09-30 11:32:53"
//     },
