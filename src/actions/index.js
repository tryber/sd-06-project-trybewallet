import get from '../services/api';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_WALLET = 'SAVE_WALLET';
export const REQUEST_RATE = 'REQUEST_RATE';
export const LOGIN = 'LOGIN';

export const inputAction = (email) => ({
  type: LOGIN,
  email,
});

export const user = (email) => (
  {
    type: SAVE_USER,
    email,
  }
);

const storeWallet = (expenses, exchangeRates) => (
  {
    type: SAVE_WALLET,
    expenses: {
      ...expenses,
      exchangeRates,
    },
  }
);

export function walletThunk(expenses) {
  return (dispatch) => get()
    .then((result) => dispatch(storeWallet(expenses, result)));
}
