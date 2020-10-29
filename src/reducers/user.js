// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER } from '../actions';

const initialState = {
  email: '',
}

export function user(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
}

export default user;
