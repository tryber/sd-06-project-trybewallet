const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_CURRENCY':
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((currency) => currency !== 'USDT'),
    };
  case 'SAVE_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'DEL_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expense),
    };
  default:
    return state;
  }
}

export default wallet;
