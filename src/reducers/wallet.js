import { GET_DATA, SAVE, ID_INCREMENT,
  TOTAL_FIELD, EXCHANGE_DATA, DELETE_EXPENSE,
  EDIT_EXPENSE, REPLACE_EXPENSE }
  from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  totalField: 0,
  expense: {
    value: '',
    description: '',
    currency: 'USD',
    method: '',
    tag: '',
  },
};

export default function (state = INITIAL_STATE, action) {
  const novaExpenses = [...state.expenses];
  switch (action.type) {
  case GET_DATA:
    return {
      ...state,
      currencies: Object.keys(action.responseJson)
        .filter((coin) => coin !== 'USDT'),
    };
  case SAVE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expense, id: state.id }],
    };
  case ID_INCREMENT:
    return {
      ...state,
      id: state.id + 1,
    };
  case TOTAL_FIELD:
    return {
      ...state,
      totalField: (parseFloat((state.expenses)
        .reduce(((acc, elem) => acc + (elem.value) * elem
          .exchangeRates[elem.currency].ask), 0))
        .toFixed(2)),
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case EXCHANGE_DATA:
    return {
      ...state,
    };
  case EDIT_EXPENSE:
    console.log(action.expense.id);
    console.log(action.expense);
    return {
      ...state,
      expense: state.expenses.find((expense) => expense.id === action.expense.id),
      isEditing: action.isEditing,
    };
  case REPLACE_EXPENSE:
    novaExpenses[action.expense.id] = action.expense;
    console.log(novaExpenses);
    return {
      ...state,
      expenses: novaExpenses,
    };
  default:
    return state;
  }
}
