// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SALVAR_CARTEIRA, PEGAR_CURRENCY, ADICIONAR_DESPESAS } from '../actions';

const ESTADO_INICIAL = {
  currencies: [],
  expenses: [],
  idAtual: [],
};

function wallet(state = ESTADO_INICIAL, action) {
  switch (action.type) {
  case SALVAR_CARTEIRA:
    return { ...state, expenses: action.payload };
  case PEGAR_CURRENCY:
    return { ...state, currencies: action.payload };
  case ADICIONAR_DESPESAS:
    return { ...state, expenses: action.payload };
  default:
    return state;
  }
}

export default wallet;
