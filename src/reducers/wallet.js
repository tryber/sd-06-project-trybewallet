const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  default:
    return state;
  }
}

export default reducer;
