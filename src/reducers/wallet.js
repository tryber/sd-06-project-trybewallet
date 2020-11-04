const INITIAL_STATE = {
  currencyToExchange: 'BRL',
  expenses: [],
};

const ADD_EXPENSE = 'ADD_EXPENSE';

const wallet = (state = INITIAL_STATE, action) => {
  const { expenses } = state;
  const { type, expense } = action;
  switch (type) {
  case ADD_EXPENSE:
    return ({
      ...state,
      expenses: [...expenses, expense],
    });
  default:
    return state;
  }
};

export default wallet;
