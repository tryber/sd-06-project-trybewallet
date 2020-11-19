// Esse reducer será responsável por tratar as informações da pessoa usuária

// rascunho que pegeui com a Letícia

// function validEmail(email){
//   return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
// }
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
