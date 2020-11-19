export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

const removeExpenseAction = (expense) => ({
  type: REMOVE_EXPENSE,
  payload: {
    expense,
  },
});

export function removeExpense(expense) {
  return (dispatch) => {
    dispatch(removeExpenseAction(expense));
  };
}
