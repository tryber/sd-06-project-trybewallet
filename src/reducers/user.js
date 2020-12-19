// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  //  retorna um novo estado baseado no type da action
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email }; // action.email - esse email é o que veio da sua action - objeto da sua action
  default:
    return state;
  }
};

export default user;
