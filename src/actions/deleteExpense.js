import { DELETE_EXPENSE } from './actionTypes';

function deleteExpense(expenseId, convertedBRLExpense) {
  const action = {
    type: DELETE_EXPENSE,
    payload: {
      expenseId,
      convertedBRLExpense,
    },
  };
  return action;
}

export default deleteExpense;
