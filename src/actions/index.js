import fetchCurrencyApi from '../services/fetchApi';

export const LOGIN = 'LOGIN';
export const WALLET = 'WALLET';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const wallet = (currencies, expenses) => ({
  type: WALLET,
  currencies: [],
  expenses: [],
});

export function thunkCurrency() {
  return (dispatch) => {
    dispatch(wallet());
    return fetchCurrencyApi()
      
  }
}

// export const thunkCurrence = () => {
//   return (dispatch) => {
//     fetchApi()
//       .then((curr) => dispatch(wallet(curr)))
//   }
// }
