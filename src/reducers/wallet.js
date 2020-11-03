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
  case IS_EDITING_EXPENSE: {
    return {
      ...state,
      idEditing: action.id,
    };
  }
  case EDIT_EXPENSE: {
    const myExpenses = [...state.expenses];
    myExpenses[action.id] = { ...action.expense, id: action.id };
    const total = myExpenses.reduce((acc, item) => {
      const totalItem = parseFloat(item.value * item.exchangeRates[item.currency].ask);
      return acc + totalItem;
    }, 0);
    return {
      ...state,
      idEditing: -1,
      expenses: [...myExpenses],
      totalExpense: total,
    };
  }
  case DELETE_EXPENSE:
    const myExpenses = [...state.expenses];
    const myExpensesDelete = myExpenses.filter((item) => item.id !== action.id);
    const totalDelete = myExpensesDelete.reduce((acc, item) => {
      const totalItem = parseFloat(item.value * item.exchangeRates[item.currency].ask);
      return acc + totalItem;
    }, 0);
    return {
      ...state,
      expenses: [...myExpensesDelete],
      totalExpense: totalDelete,
    };
  default:
    return state;
  }
}

export default wallet;
