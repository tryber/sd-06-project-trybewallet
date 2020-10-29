export const LOGIN = 'LOGIN';
export const OUTRA = 'OUTRA';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const outraCoisa = (email) => ({
  type: OUTRA,
  email,
});
