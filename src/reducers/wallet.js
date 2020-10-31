import { EXPENSES } from '../actions';

const CURRENCY = 'CURRENCY'
const INITIAL_STATE = { currencies: [], expenses: [] };
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

export default function (state = INITIAL_STATE, action) {
  // retorna um novo estado baseado no type da action
  switch (action.type) {
  case CURRENCY:
    return {...state, currencies: Object.keys(action.currency)};
  case EXPENSES:
    return { ...state, expenses: [action.expense] };
  default:
    return state;
  }
}