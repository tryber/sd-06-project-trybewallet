import { initialTransactionsState } from '../state';
import { REGISTER, REMOVE, LOAD, UPDATE } from '../actions';

function handleTransactionCreation(state, action) {
  const {
    value,
    currency,
    description,
    method,
    tag,
    exchangeRates,
  } = action.payload;

  const id = state.expenses.length;

  const newExpense = {
    id,
    value,
    currency,
    description,
    method,
    tag,
    exchangeRates,
  };

  const oldWallet = { ...state };
  const oldExpenses = [...state.expenses];
  const newExpenses = [...oldExpenses, newExpense];

  return { ...oldWallet, expenses: newExpenses };
}

function handleTransactionRemoval(state, action) {
  const { transactionID } = action.payload;

  const oldWallet = { ...state };
  const oldExpenses = [...state.expenses];

  const newExpenses = oldExpenses.filter((transaction) => (
    transaction.id !== transactionID
  ));

  return { ...oldWallet, expenses: newExpenses };
}

function handleLoadCurrencies(state, action) {
  const { currencies } = action.payload;

  const oldWallet = { ...state };

  return { ...oldWallet, currencies };
}

function handleTransactionUpdate(state, action) {
  const { transactionData, id } = action.payload;

  const oldWallet = { ...state };
  const oldExpenses = [...state.expenses];

  const newExpenses = oldExpenses.map((transaction) => {
    if (transaction.id !== id) {
      return transaction;
    }

    return Object.assign(transaction, transactionData);
  });

  return { ...oldWallet, expenses: newExpenses };
}

export default function transactionReducer(state = initialTransactionsState, action) {
  switch (action.type) {
  case REGISTER:
    return handleTransactionCreation(state, action);
  case REMOVE:
    return handleTransactionRemoval(state, action);
  case UPDATE:
    return handleTransactionUpdate(state, action);
  case LOAD:
    return handleLoadCurrencies(state, action);
  default:
    return state;
  }
}
