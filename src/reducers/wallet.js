const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'BUY':
    return (
      {
        ...state,
        currencies: action.currencies,
        expenses: action.expenses,
      }
    );
  default:
    return state;
  }
};
