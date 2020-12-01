import { GET_CURRENCIES,
  CREATE_EXPENSE,
  FILTER_EXPENSE,
  EDITING_EXPENSE } from '../actions';

const INITIAL_STATE = {
  editing: '',
  currencies: [],
  expenses: [],
};

function handleNewExpense(state, action) {
  const { value, description, currency, method, tag, exchangeRates } = action.payload;

  const { expenses } = state;
  let id = 0;
  if (expenses.length === 0) {
    id = 0;
  } else {
    id = expenses.length;
  }

  const newExpense = {
    id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  };

  const newUpdatedExpenses = [...expenses, newExpense];

  return { ...state, expenses: newUpdatedExpenses };
}

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload.currencies };
  case CREATE_EXPENSE:
    return handleNewExpense(state, action);
  case FILTER_EXPENSE:
    return { ...state, expenses: action.filteredExpense };
  case EDITING_EXPENSE:
    return { ...state, editing: action.expenseId };
  default:
    return state;
  }
}
