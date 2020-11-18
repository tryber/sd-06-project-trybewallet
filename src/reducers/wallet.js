const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'CURRENCIES':
    return { ...state, currencies: [action.payload] };
  case 'ADD_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'DEL_EXPENSE':
    return { ...state,
      expenses: state.expenses.filter((exp) => exp.id !== action.expense) };
  default:
    return state;
  }
}

export default walletReducer;
