import { SET_LOGIN, SET_WALLET } from './types';

export const login = (email) => ({
  type: SET_LOGIN,
  email,
});

export const wallet = (currencies) => ({
  type: SET_WALLET,
  currencies,
});
