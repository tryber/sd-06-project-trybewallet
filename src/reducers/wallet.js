const initialState = {
  currencies: [],
  expenses: [],
  total: 0,
  id: undefined,
};

function wallet(state = initialState, { type, payload }) {
  switch (type) {
  case 'GET_CURRENCY':
    return {
      ...state,
      currencies: payload,
    };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        ...payload.expenses,
      }],
      total: payload.total,
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: [...payload.expenses],
      total: state.total + payload.total,
    };
  case 'ADD_ID':
    return {
      ...state,
      id: payload,
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: payload,
      id: undefined,
    };
  default:
    return state;
  }
}

export default wallet;
