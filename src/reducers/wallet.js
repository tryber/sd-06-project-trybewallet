const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state,
      expenses: [...state.expenses, action.value.expenses],
      total: state.total + action.value.total,
    };
  case 'ADD_CURRENCY':
    return { ...state, currencies: [...action.value] };
  case 'DEL_EXPENSE':
    return { ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.value)] };
  default:
    return state;
  }
}

export default wallet;
