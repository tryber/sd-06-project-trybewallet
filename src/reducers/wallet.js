import { ADD_EXPENSE, CURRENCY } from '../actions';

const INITIAL_STATE = {
  currencies: {},
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY:
    return { ...state, currencies: action.code };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.expense,
      ],
      id: state.expenses.length,
    };
  default:
    return state;
  }
};

export default wallet;
