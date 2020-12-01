// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SALVAR_CARTEIRA } from '../actions';

const ESTADO_INICIAL = {
  currencies: [],
  expenses: [0],
};

function wallet(state = ESTADO_INICIAL, action) {
  switch (action.type) {
  case SALVAR_CARTEIRA:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
