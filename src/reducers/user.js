// Esse reducer será responsável por tratar as informações da pessoa usuária
// Reducer --> retorna um novo estado baseado no type da action
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
