// export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';

export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';

export { ADD_USER_EMAIL, loginUser } from './ADD_USER_EMAIL';
export { REMOVE_EXPENSE, removeExpense } from './REMOVE_EXPENSE';

// const addUserEmail = (email) => ({
//   type: ADD_USER_EMAIL,
//   payload: {
//     email,
//   },
// });

const addCurrencies = (currencies) => ({
  type: ADD_CURRENCIES,
  payload: {
    currencies,
  },
});

const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: {
    expense,
  },
});

// export function loginUser(email) {
//   return (dispatch) => {
//     dispatch(addUserEmail(email));
//   };
// }

export function storeCurrencies(currencies) {
  return (dispatch) => {
    dispatch(addCurrencies(currencies));
  };
}

export function storeExpense(expense) {
  return (dispatch) => {
    dispatch(addExpense(expense));
  };
}
