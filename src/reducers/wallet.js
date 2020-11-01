// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, REQUEST_CURRENCIES, RECEIVE_CURRENCIES } from '../actions';

const DEFAULT_STATE = {
  isFetching: false,
  nextId: 0,
  totalExpense: 0,
  currencies: [],
  expenses: [],
};

function wallet(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      isFetching: false,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      isFetching: false,
      expenses: [...state.expenses,
        {
          ...action.expense,
          id: state.nextId,
        },
      ],
      nextId: state.nextId + 1,
      totalExpense: state.totalExpense
        + parseFloat(action.expense.value
          * action.expense.exchangeRates[action.expense.currency].ask),
    };
  default:
    return state;
  }
}

export default wallet;
