// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  DELETE_EXPENSE,
  IS_EDITING_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const DEFAULT_STATE = {
  idEditing: -1,
  isFetching: false,
  nextId: 0,
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
    };
  case IS_EDITING_EXPENSE: {
    return {
      ...state,
      idEditing: action.id,
    };
  }
  case EDIT_EXPENSE: {
    return {
      ...state,
      idEditing: -1,
      expenses: [...action.expenses],
    };
  }
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id),
    };
  default:
    return state;
  }
}

export default wallet;
