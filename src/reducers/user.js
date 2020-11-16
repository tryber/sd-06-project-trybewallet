import { LOGIN } from '../actions';

const initialState = { email: '' };

function user(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return { email: action.email };
  default:
    return state;
  }
}

export default user;