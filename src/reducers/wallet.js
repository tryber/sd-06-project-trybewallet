// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { UPDATE } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE:
    return { ...state, user: { ...state.user, email: action.email } };
  default:
    return state;
  }
}
