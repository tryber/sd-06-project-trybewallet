// Esse reducer será responsável por tratar as informações da pessoa usuária
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

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE:
    return { ...state, user: { ...state.user, email: action.email } };
  default:
    return state;
  }
}

export default user;
