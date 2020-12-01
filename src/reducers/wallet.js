import { CREATE_EXPENSE } from '../actions/actionsCreator';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function handleNewExpense(state, action) {
  const { value, description, currency, method, tag, exchangeRates } = action.payload;

  const { expenses } = state;
  const id = expenses.length;

  const newExpense = {
    id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  };

  const updatedExpenses = [...expenses, newExpense];

  return { ...state, expenses: updatedExpenses };
}

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_EXPENSE:
    return handleNewExpense(state, action);
  default:
    return state;
  }
}
