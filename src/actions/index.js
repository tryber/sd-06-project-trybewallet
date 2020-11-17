// Coloque aqui suas actions
export const FILL_EMAIL = 'FILL_EMAIL';
export const FILL_PASSWORD = 'FILL_PASSWORD';

export const fillEmail = (email) => (
  { type: FILL_EMAIL, email }
);

export const fillPassword = (password) => (
  { type: FILL_PASSWORD, password }
);
