export const LOGIN = 'LOGIN';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const userLogin = (email) => ({
  type: LOGIN,
  email,
});

export const addTransaction = (expenses) => ({
  type: ADD_TRANSACTION,
  expenses,
});
