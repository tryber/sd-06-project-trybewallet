// Coloque aqui suas actions
export const EMAIL_STORE = 'EMAIL_STORE';

export const storeEmail = (email) => ({
  type: EMAIL_STORE,
  email,
});
