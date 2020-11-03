import { EXPENSES, CURRENCY, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [] };
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

export default function (state = INITIAL_STATE, action) {
  // retorna um novo estado baseado no type da action
  switch (action.type) {
  case CURRENCY:
    return { ...state, currencies: Object.keys(action.currency) };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses.slice(0, action.payload),
        ...state.expenses.slice(action.payload + 1, state.expenses.length),
      ],
    };
  default:
    return state;
  }
}
