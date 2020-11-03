// Coloque aqui suas actions
// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const BUTTON_DISABLE = 'BUTTON_DISABLE';

export const loginAction = (emailUser) => ({
  type: LOGIN,
  email: emailUser,
});
