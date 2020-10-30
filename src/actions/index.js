export const LOGIN = 'LOGIN';

export const loginSucess = (email) => (
  { type: LOGIN, payload: email }
);
