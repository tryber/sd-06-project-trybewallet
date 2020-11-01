// Esse reducer será responsável por tratar as informações da pessoa usuária
import { GET_CURRENCY, ADD_EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return { ...state, currencies: action.currency };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { id: state.expenses.length, ...action.expense.expenses },
      ],
      total: action.expense.total,
    };
  case REMOVE_EXPENSE: {
    const filteredExpenses = state.expenses.filter(
      (item) => item.id !== action.expense.id,
    );
    const newTotal = state.total - action.convValue;
    return {
      ...state,
      expenses: [...filteredExpenses],
      total: newTotal,
    };
  }
  default:
    return state;
  }
}
