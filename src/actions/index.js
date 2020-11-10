import types from '../services/actionTypes';

const emailToState = (email, log) => (
  {
    type: types.LOG_EMAIL,
    email,
    log,
  });

export default emailToState;
