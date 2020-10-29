export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';

const addUserEmail = (email) => ({
  type: ADD_USER_EMAIL,
  payload: {
    email,
  },
});

export function loginUser(email) {
  return (dispatch) => {
    dispatch(addUserEmail(email));
  };
}
