const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'USER_WALLET':
    return { ...state };
  default:
    return state;
  }
}

export default walletReducer;
