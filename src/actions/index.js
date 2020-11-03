// Coloque aqui suas actions
// action: obj propriedade type
// as actions creators são as funções que retornam esses objetos

// action que vai salvar o email
const login = (email) => ({
  type: 'LOGIN',
  email,
});

export default login;
