const INITIAL_STATE_WALLET = {
  currencies: [1, 2, 3],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case 'REQUEST_OK':
    console.log(action);
    return { ...state, currencies: Object.keys(action.currencies) };
  case 'SAVE_EXPENSES':
    console.log(action);
    return { ...state, expenses: action.expenses };
  default:
    return state;
  }
}

export default walletReducer;
