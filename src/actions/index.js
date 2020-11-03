export const LOGIN_USER = 'LOGIN_USER';

export const LoginUser = (payload) => ({
  type: LOGIN_USER,
  payload,
});

export const EXPENSES_DATA = 'EXPENSES_DATA';

export const expensesData = (payload) => ({
  type: EXPENSES_DATA,
  payload,
});
