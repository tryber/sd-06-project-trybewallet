import { SUCCESS, ADD_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUCCESS:
    return (
      {
        ...state,
        currencies: [
          ...Object.keys(action.payload)
            .filter((currency) => currency !== 'USDT'),
        ],
      }
    );
  case ADD_EXPENSES:
    return (
      {
        ...state,
        expenses: [...state.expenses, action.payload],
      }
    );
  default:
    return state;
  }
};
