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

//  reducer é uma funçao que recebe po parametro o estado global  e uma action e retorna um novo estado baseado na type da action
//   e recebe o Esse reducer será responsável por tratar as informações da pessoa usuária  - email
//
// o que retornar deve representar o que vai estar no meu estado global/  o que retornar substitui o que estava
