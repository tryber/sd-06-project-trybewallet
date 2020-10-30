export const newEmail = (value) => ({
  type: NEW_USER,
  value,
});

export const delEmail = (value) => ({
  type: REMOVE_USER,
  value,
});

export const expenses = (payload) => ({
  type: NEW_EXPENSES,
  payload,
});

export const currencies = (payload) => ({
  type: NEW_CURRENCIES,
  payload,
});
