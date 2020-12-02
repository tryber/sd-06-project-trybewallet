// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SALVAR_CARTEIRA, PEGAR_CURRENCY } from '../actions';

const ESTADO_INICIAL = {
  currencies: [],
  expenses: [],
};

function wallet(state = ESTADO_INICIAL, action) {
  switch (action.type) {
  case SALVAR_CARTEIRA:
    return { ...state, expenses: action.payload };
  case PEGAR_CURRENCY:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
}

export default wallet;
