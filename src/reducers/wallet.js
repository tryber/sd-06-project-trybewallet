const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_CURRENCY':
    return { ...state, currencies: Object
      .keys(action.payload)
      .filter((currency) => currency !== 'USDT'),
    };
  default:
    return state;
  }
}

export default wallet;
