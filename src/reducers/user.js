import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
export default userReducer;
// Esse reducer será responsável por tratar as informações da pessoa usuária
// reducer = função que recebe por parametro o estado global e uma action e retorna um novo estado baseado no type da action
