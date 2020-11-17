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

export const currencyAPI = () => async (dispatch) => {
  const APIreturn = await fetchAPI();
  const currencies = Object.keys(APIreturn).filter((key) => key !== 'USDT');
  dispatch(addCurrencies(currencies));
};
