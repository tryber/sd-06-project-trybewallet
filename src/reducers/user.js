import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, ...action.payload };
  default:
    return state;
  }
}
