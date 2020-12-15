import { ADD_TRANSACTION } from '../actions';

const initialState = {
  expenses: [],
};

function wallet(state = initialState, action) {
  switch (action.type) {
  case ADD_TRANSACTION:
    return {
      ...state,
      expenses: state.expenses.concat(action.expenses),
    };
  default:
    return state;
  }
}

export default wallet;
