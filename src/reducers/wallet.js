import { SET_WALLET } from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  hellworld: 'helldux',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_WALLET:
    return {
      ...state,
      currencies: action.currencies,
      expenses: action.expenses,
    };
  default:
    return state;
  }
}
