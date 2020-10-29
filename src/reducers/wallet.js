import initialAppState from '../state';
import { REGISTER, REMOVE } from '../actions';

function handleStateUpdate(state, action) {
  const {
    value,
    currency,
    description,
    method,
    tag,
    exchangeRates,
  } = action.payload;

  const id = state.wallet.expenses.length;

  const newExpense = {
    id,
    value,
    currency,
    description,
    method,
    tag,
    exchangeRates,
  };

  const oldWallet = { ...state.wallet };
  const oldExpenses = [...state.wallet.expenses];
  const newExpenses = [...oldExpenses, newExpense];

  return { ...state, wallet: { ...oldWallet, expenses: newExpenses } };
}

function handleTransactionRemoval(state, action) {
  const { transactionID } = action.payload;

  const oldWallet = { ...state.wallet };
  const oldExpenses = [...state.wallet.expenses];

  const newExpenses = oldExpenses.filter((transaction) => (
    transaction.id !== transactionID
  ));

  return { ...state, wallet: { ...oldWallet, expenses: newExpenses } };
}

export default function transactionReducer(state = initialAppState, action) {
  switch (action.type) {
  case REGISTER:
    return handleStateUpdate(state, action);
  case REMOVE:
    return handleTransactionRemoval(state, action);
  default:
    return state;
  }
}
