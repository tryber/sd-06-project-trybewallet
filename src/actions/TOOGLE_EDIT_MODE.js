export const TOOGLE_EDIT_MODE = 'TOOGLE_EDIT_MODE';

const toogleEditAction = (editMode, expense = {}) => ({
  type: TOOGLE_EDIT_MODE,
  editMode,
  payload: {
    expense,
  },
});

export function toogleEdit(editMode, expense = {}) {
  return (dispatch) => {
    dispatch(toogleEditAction(editMode, expense));
  };
}
