const initialState = {
  currencies: [],
  expenses: [],
  coins: {},
  total: 0,
  id: undefined,
};

export function wallet(state = initialState, { type, payload }) {
  switch (type) {
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
  case 'EDIT_EXPENSE':
    return {
      ...state,
      expenses: payload,
      id: undefined,
    };
  case 'ADD_ID':
    return {
      ...state,
      id: payload,
    };
  default:
    return state;
  }
}

export function exchange(state = { coins: {} }, { type, payload }) {
  switch (type) {
  case 'GET_CURRENCY':
    return {
      coins: payload,
    };
  default:
    return state;
  }
}
