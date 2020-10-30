// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ERROR, LOADING, SUCCESS, SAVE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  coinsOptions: {},
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING:
    return { ...state, isFetching: true };
  case SUCCESS:
    return {
      ...state,
      coinsOptions: action.data,
      isFetching: false,
    };
  case ERROR:
    return { ...state };
  case SAVE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}
