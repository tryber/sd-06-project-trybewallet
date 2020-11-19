import { CADASTRO_SAVE_EMAIL } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  // console.log(action);
  switch (action.type) {
  case CADASTRO_SAVE_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;
