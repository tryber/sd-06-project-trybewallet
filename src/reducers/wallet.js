const initialState = {
  currencies: [],
  expenses: [],
  total: 0,
  isFetching: false,
  error: '',
};

function wallet(state = initialState, { type, payload }) {
  const id = state.expenses.length;

  switch (type) {
  case 'REQUEST_CURRENCY':
    return { ...state, isFetching: true };
  case 'GET_CURRENCY':
    return {
      ...state,
      currencies: payload,
      isFetching: false,
    };
  case 'FAILED_REQUEST':
    return { ...state, error: payload, isFetching: false };
  case 'ADD_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, { id, ...payload.expenses }],
      total: payload.total,
    };
  case 'REMOVE_EXPENSE':
    return {
      ...state,
      expenses: [...payload.expenses],
      total: state.total + payload.total,
    };
  default:
    return state;
  }
}

export default wallet;
