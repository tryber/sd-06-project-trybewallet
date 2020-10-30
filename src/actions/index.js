// Coloque aqui suas actions
// const setForms = (payload) => ({
//   type: 'SET_FORMS',
//   payload,
// });

export const LOGIN = 'LOGIN';
export const loginUsers = (email) => ({
  type: LOGIN,
  email,
});
