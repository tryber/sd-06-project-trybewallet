import fetchCurrencyApi from '../services/fetchApi';

export const LOGIN = 'LOGIN';
export const SUCESS_CURRENCIES = 'SUCESS_CURRENCIES';
export const SUCESS_EXPENSES = 'SUCESS_EXPENSES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const sucessCurrencies = (currencies) => ({
  type: SUCESS_CURRENCIES,
  currencies: [],
});

// export const sucessExpenses = (expenses) => ({
//   type: SUCESS_EXPENSES,
//   expenses: [],
// });

export const thunkCurrency = () => async (dispatch) => {
  const curriencies = await fetchCurrencyApi();
  dispatch(sucessCurrencies(curriencies));
};

// export const thunkCurrence = () => {
//   return (dispatch) => {
//     fetchApi()
//       .then((curr) => dispatch(wallet(curr)))
//   }
// }
