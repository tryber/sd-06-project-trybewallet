// Esse reducer será responsável por tratar as informações da pessoa usuária
import { BUTTON_DISABLE, LOGIN } from '../actions/index';

const INITIAL_STATE = [{
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
}];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  case BUTTON_DISABLE:
    return { ...state, button: action.button };
  default:
    return state;
  }
}
