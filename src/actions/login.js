// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const loginAction = (emailUser) => ({
  type: LOGIN,
  email: emailUser,
});
