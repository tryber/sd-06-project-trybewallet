import { SAVE_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET:
    return {
      ...state,
      currencies: action.currencies,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default user;
