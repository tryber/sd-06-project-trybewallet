import { START_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, { type, email }) {
  switch (type) {
  case START_LOGIN:
    return {
      ...state,
      email,
    };
  default:
    return state;
  }
}
