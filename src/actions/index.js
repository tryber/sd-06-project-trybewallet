export const LOGIN = 'LOGIN';
export const FORM_ENTRIES = 'FORM_ENTRIES';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const wallet = (expenses) => ({
  type: FORM_ENTRIES,
  expenses,
});
