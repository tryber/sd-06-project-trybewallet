// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SALVAR_MOEDA, PEGAR_CURRENCY, ADICIONAR_DESPESAS, APAGAR_DESPESAS,
  SALVAR_ID_EDITAR, EDITAR_DESPESAS,
} from '../actions';

const ESTADO_INICIAL = {
  currencies: [],
  expenses: [],
  idEditar: null,
};

function editarDespesas(despesas, despesaEditada) {
  const novasDespesa = [...despesas];
  novasDespesa[despesaEditada.id] = despesaEditada;
  return novasDespesa;

}

function wallet(state = ESTADO_INICIAL, action) {
  switch (action.type) {
  case SALVAR_MOEDA:
    return { ...state, expenses: action.payload };
  case PEGAR_CURRENCY:
    return { ...state, currencies: action.payload };
  case ADICIONAR_DESPESAS:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case APAGAR_DESPESAS:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id),
    };
  case SALVAR_ID_EDITAR:
    return {
      ...state,
      idEditar: action.id,
    };
  case EDITAR_DESPESAS:
    return {
      ...state,
      expenses: editarDespesas(state.expenses, action.despesa),
      idEditar: null,
    };
  default:
    return state;
  }
}

export default wallet;
