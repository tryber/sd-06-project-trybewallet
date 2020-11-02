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
  default:
    return state;
  }
}

export default walletReducer;
