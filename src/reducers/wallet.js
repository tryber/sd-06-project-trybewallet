import { SAVE_EXPENSE } from "../actions";

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  // console.log('wallet', action);
  switch (action.type) {
  case SAVE_EXPENSE:
    delete action.type;
    return { ...state, expenses: [...state.expenses, action] };
  default:
    return state;
  }
}

export default wallet;
