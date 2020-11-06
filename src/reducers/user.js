import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function loginUsuario(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email};
  default:
    return state;
  }
}

// Esse reducer será responsável por tratar as informações da pessoa usuária
