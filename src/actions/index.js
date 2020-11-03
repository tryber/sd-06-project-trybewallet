import getCurrency from '../services/currencyAPI';

export const START_LOGIN = 'START_LOGIN';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const SUCESS_CURRENCY = 'SUCESS_CURRENCY';

export const startLogin = (email) => ({
  type: START_LOGIN,
  email,
});

export const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

const requestCurrency = () => ({
  type: REQUEST_CURRENCY,
});

const sucessCurrency = (currencies) => ({
  type: SUCESS_CURRENCY,
  currencies,
});

export default function fetchCurrency() {
  return async (dispatch) => {
    dispatch(requestCurrency());
    const responseCurrency = await getCurrency();
    dispatch(sucessCurrency(responseCurrency));
  };
}
