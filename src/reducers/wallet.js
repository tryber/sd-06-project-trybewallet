// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { SUCCESS, SAVE, CHANGE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SUCCESS:
    return {
      ...state,
      currencies: action.data,
    };
  case SAVE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case CHANGE:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}
