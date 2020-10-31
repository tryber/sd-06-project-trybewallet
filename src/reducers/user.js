import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
  loggedIn: false,
};

export default function userReducer(state = INITIAL_STATE, action) {
  console.log(action);
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
