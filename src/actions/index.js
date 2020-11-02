export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addEmailToState = (email, loggedIn) => (
  {
    type: ADD_EMAIL,
    email,
    loggedIn,
  });

export const addExpensesToState = (expense) => (
  {
    type: ADD_EXPENSES,
    expense,
  });
