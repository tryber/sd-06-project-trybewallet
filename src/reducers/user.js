import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

// Esse reducer será responsável por tratar as informações da pessoa usuária
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
