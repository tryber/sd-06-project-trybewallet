export const SAVE_EDITED_EXPENSE = 'SAVE_EDITED_EXPENSE';

const saveEditAction = (expense = {}) => ({
  type: SAVE_EDITED_EXPENSE,
  payload: {
    ...expense,
  },
});

export function saveEdited(expense = {}) {
  return (dispatch) => {
    dispatch(saveEditAction(expense));
  };
}
