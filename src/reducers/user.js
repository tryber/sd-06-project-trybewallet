// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SALVAR_USUARIO } from '../actions';

const ESTADO_INICIAL = {
  email: '',
};

function user(state = ESTADO_INICIAL, action) {
  switch (action.type) {
  case SALVAR_USUARIO:
    return { ...state, email: action.payload };
  default:
    return state;
  }
}

export default user;
