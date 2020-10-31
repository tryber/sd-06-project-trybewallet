import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
  loggedIn: false,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      email: action.email,
      loggedIn: action.loggedIn,
    };
  default:
    return state;
  }
}
