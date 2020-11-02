// Coloque aqui suas actions
// action: obj propriedade type
// as actions creators são as funções que retornam esses objetos

// action que vai salvar o email
export const login = (email) => ({
  type: 'LOGIN',
  email,
});
