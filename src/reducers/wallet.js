import { CURRENCY_FETCH, ADD_EXPENSE, CLEAR_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCY_FETCH:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((cur) => cur !== 'USDT'),
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };

  case CLEAR_EXPENSE:
    return {
      ...state,
      // vai filtrar todas id diferentes de id da action
      expenses: state.expenses.filter((despesa) => despesa.id !== action.id),
    };
  default:
    return state;
  }
}
