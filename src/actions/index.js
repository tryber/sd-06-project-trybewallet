export const saveUser = (userEmail) => ({
  type: 'SAVE_USER',
  payload: userEmail,
});

export const saveCurrency = (currencies) => ({
  type: SAVE_CURRENCY,
  currencies,
});
