// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const loginUserAction = (emailUser) => ({
  type: LOGIN,
  email: emailUser,
});
