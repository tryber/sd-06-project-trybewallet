import initialAppState from '../state';
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

function handleLoadCurrencies(state, action) {
  const { currencies } = action.payload;

  const oldWallet = { ...state.wallet };

  return { ...state, wallet: { ...oldWallet, currencies } };
}

function handleTransactionUpdate(state, action) {
  const { transactionData, id } = action.payload;

  const oldWallet = { ...state.wallet };
  const oldExpenses = [...state.wallet.expenses];

  const newExpenses = oldExpenses.map((transaction) => {
    if (transaction.id !== id) {
      return transaction;
    }

    return Object.assign(transaction, transactionData);
  });

  return { ...state, wallet: { ...oldWallet, expenses: newExpenses } };
}

export default function transactionReducer(state = initialAppState, action) {
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
