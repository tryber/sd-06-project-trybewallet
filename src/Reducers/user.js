import { LOGIN_EMAIL } from '../actions/index';

const initialState = {
  email: '',
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case LOGIN_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
