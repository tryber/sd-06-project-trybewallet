export const TOOGLE_EDIT_MODE = 'TOOGLE_EDIT_MODE';

const toogleEditAction = (editMode) => ({
  type: TOOGLE_EDIT_MODE,
  editMode,
});

export function toogleEdit(editMode) {
  return (dispatch) => {
    dispatch(toogleEditAction(editMode));
  };
}
