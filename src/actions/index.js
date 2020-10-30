// Coloque aqui suas actions
export const LOGIN_INPUT = 'LOGIN_INPUT';

export const loginInput = (name, input) => ({
  type: LOGIN_INPUT,
  field: name,
  value: input,
});
