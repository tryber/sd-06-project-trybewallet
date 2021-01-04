// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_USER:
    return ({
      ...state,
      email: action.userName,
    });
  default:
    return state;
  }
}

export default user;
