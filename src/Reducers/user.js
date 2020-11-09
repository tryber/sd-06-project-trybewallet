import { LOGIN_EMAIL } from '../Actions';

const initalState = {
  email: '',
};

export default function user(state = initalState, action) {
  switch (action.type) {
  case LOGIN_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
