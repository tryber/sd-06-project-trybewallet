// Esse reducer será responsável por tratar as informações da pessoa usuária
import { FILL_EMAIL } from '../actions/index';

const initialState = {
  email: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
  case FILL_EMAIL:
    return {
      // ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
