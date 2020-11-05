import { LOGIN } from '../actions';

function user(state = { email: '' }, action) {
  switch (action.type) {
  case LOGIN:
    return { email: action.email };
  default:
    return state;
  }
}

export default user;
