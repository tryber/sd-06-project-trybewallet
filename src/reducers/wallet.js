// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { TOTAL_WALLET, SAVE_EXPENSE, DELETE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencyToExchange: 'BRL',
  currentId: 0,
  currencies: [],
  expenses: [],
};

function deleteExpense(state, expenseId) {
  const newExpenses = state.expenses.filter((expense) => expense.id !== expenseId);
  return newExpenses;
}

function wallet(state = INITIAL_STATE, action) {
  let newExpenses = [];
  if (action.type === DELETE_EXPENSE) {
    newExpenses = deleteExpense(state, action.expenseId);
  }

  switch (action.type) {
  case TOTAL_WALLET:
    return { ...state, currencies: action.payload };
  case SAVE_EXPENSE:
    return ({
      ...state,
      currentId: state.currentId + 1,
      expenses: [
        ...state.expenses,
        {
          id: state.currentId,
          ...action.payload,
        }],
    });
  case DELETE_EXPENSE:
    return ({
      ...state,
      expenses: newExpenses,
    });
  default:
    return state;
  }
}

export default wallet;
