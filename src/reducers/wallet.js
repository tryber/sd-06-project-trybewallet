const INITIAL_STATE = {
  currencies: ['BRL'],
  expenses: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCY':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'EXPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
};

export default wallet;
