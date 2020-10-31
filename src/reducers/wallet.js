const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function wallet(state = INITIAL_STATE, { type, expenses, currencies }) {
  switch (type) {
  case 'ADD_EXPENSES':
    return {
      ...state,
      expenses,
    };
  case 'CURRENCIES':
    return {
      ...state,
      currencies,
    };
  default:
    return state;
  }
}
