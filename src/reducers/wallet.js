const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  sum: 0,
  exchange: 'BRL',
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_COIN':
    return { ...state, currencies: action.currency };
  case 'ADD_EXPEND':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'ADD_SUM_VALUE':
    return { ...state, sum: action.value };
  default:
    return state;
  }
}
