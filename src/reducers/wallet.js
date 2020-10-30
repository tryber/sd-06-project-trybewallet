const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_CURRENCY':
    return { ...state, wallet: action.payload };
  default:
    return state;
  }
}

export default wallet;
