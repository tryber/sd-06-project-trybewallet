const INITIAL_STATE = [];

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSES':
    return [...state, action.payload];
  default:
    return state;
  }
}

export default walletReducer;
