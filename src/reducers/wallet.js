const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  console.log(action.value);
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.value.expenses] };
  case 'ADD_CURRENCY':
    return { ...state, currencies: [...action.value] };
  default:
    return state;
  }
}

export default wallet;
