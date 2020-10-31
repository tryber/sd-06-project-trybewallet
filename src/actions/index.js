// Coloque aqui suas actions
export const EMAIL_STORE = 'EMAIL_STORE';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const storeEmail = (email) => ({
  type: EMAIL_STORE,
  email,
});

export const storeExpenses = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});
