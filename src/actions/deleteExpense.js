import { DELETE_EXPENSE } from './actionTypes';

function deleteExpense(toDeleteExpenseId) {
  const action = {
    type: DELETE_EXPENSE,
    payload: {
      toDeleteExpenseId,
    },
  };
  return action;
}

export default deleteExpense;
