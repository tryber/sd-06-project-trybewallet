export const USER_EMAIL = 'USER_EMAIL';
export const WALLET_CHANGES = 'WALLET_CHANGES';

export const addUserEmail = (email) => ({
  type: USER_EMAIL,
  payload: email,
});

export const catchInputEntries = (currencies, expenses) => ({
  type: WALLET_CHANGES,
  payload: {
    currencies,
    expenses,
  },
})