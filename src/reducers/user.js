import types from '../services/actionTypes';

const INITIAL_STATE = {
  email: '',
  log: false,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case types.LOG_EMAIL:
    return {
      email: action.email,
      log: action.log,
    };
  default:
    return state;
  }
}
