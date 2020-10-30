// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_INPUT } from '../actions';

const initialState = {
  email: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case LOGIN_INPUT:
    return { ...state, [action.field]: action.value };
  default:
    return state;
  }
}
