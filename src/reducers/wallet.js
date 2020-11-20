const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case 'REQUEST_OK':
    return { ...state, currencies: Object.keys(action.currencies) };
  case 'SAVE_EXPENSES':
    return { ...state,
      expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
}

export default walletReducer;
