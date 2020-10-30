// Esse reducer será responsável por tratar as informações da pessoa usuária
import { WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case WALLET:
    return state;
  default:
    return state;
  }
}
