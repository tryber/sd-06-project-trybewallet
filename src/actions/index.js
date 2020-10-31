export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmailToState = (email, loggedIn) => (
  {
    type: ADD_EMAIL,
    email,
    loggedIn,
  });
