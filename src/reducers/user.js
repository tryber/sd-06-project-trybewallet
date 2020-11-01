// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_USER:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
