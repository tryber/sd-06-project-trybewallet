const { EXPENSES_DATA } = require('../actions');

const GET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const user = (state = GET_INITIAL_STATE, action) => {
  switch (action.type) {
  case EXPENSES_DATA:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
};

export default user;
