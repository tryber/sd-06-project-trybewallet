const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SAVE_CURRENCIES':
    return { ...state, currencies: action.currencies };
  case 'SAVE_EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}

export default reducer;
