import types from '../services/actionTypes';

export const emailToState = (email, log) => (
  {
    type: types.LOG_EMAIL,
    email,
    log,
  });
