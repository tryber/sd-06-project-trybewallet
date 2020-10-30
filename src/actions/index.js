export const LOGIN = 'LOGIN';

// Coloque aqui suas actions
// Funções que retornam objetos

export const login = (email) => ({
  type: LOGIN,
  email,
});
