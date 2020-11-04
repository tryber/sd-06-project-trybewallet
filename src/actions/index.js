import getCurrencies from '../services/api';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_WALLET = 'SAVE_WALLET';
export const REQUEST_RATE = 'REQUEST_RATE';
// export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
// export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
// export const DELETE_EXPENSE = 'DELETE_EXPENSE';
// export const IS_EDITING_EXPENSE = 'IS_EDITING_EXPENSE';
// export const EDIT_EXPENSE = 'EDIT_EXPENSE';

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

// const requestExchangeRate = () => ({
//   type: REQUEST_RATE,
// })

export function walletThunk(expenses) {
  return (dispatch) => getCurrencies()
    .then((result) => dispatch(storeWallet(expenses, result)));
}

// export const deleteWallet = (id) => ({
//   type: DELETE_EXPENSE,
//   id,
// });

// export const isEditingWallet = (id) => ({
//   type: IS_EDITING_EXPENSE,
//   id,
// });

// export const editWallet = (expenses) => ({
//   type: EDIT_EXPENSE,
//   expenses,
// });

// const requestCurrencies = () => ({
//   type: REQUEST_CURRENCIES,
// });

// const receiveCurrencies = (currencies) => ({
//   type: RECEIVE_CURRENCIES,
//   currencies,
// });

// export function addWalletThunk(expense) {
//   return async (dispatch) => {
//     getCurrencies()
//       .then((exchangeRates) => dispatch(
//         storeWallet({ ...expense, exchangeRates }),
//       ));
//   };
// }

// export function editWalletThunk(expenses, expense, id) {
//   return async (dispatch) => {
//     getCurrencies()
//       .then((exchangeRates) => {
//         const myExpenses = [...expenses];
//         myExpenses[id] = { ...expense, id, exchangeRates }; // Edit expense
//         dispatch(editWallet([...myExpenses]));
//       });
//   };
// }

// export function fetchCurrencies() {
//   return async (dispatch) => {
//     dispatch(requestCurrencies());
//     return getCurrencies()
//       .then((currencies) => dispatch(receiveCurrencies(currencies)));
//   };
// }
