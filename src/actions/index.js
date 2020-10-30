export const LOGIN = 'LOGIN';

export const login = (email) => ({
  type: 'LOGIN',
  email,
});
// suas actions esta primeira esta como default por causa do Slint, poderia ser payload no lugar de email pois tras esse valor consigo, o email e o nome da chave e dentro tem o valor email o que determina é a propriedade que eu mandei, como foi o mesmo nome ficou só um email)1:10)
// action é um objeto com a propriedade type e qualquer outro tipo de valor que queira passar aqui
// As actionCreate são funções que retornam um objeto
/// definir as funçoes que retorna as actions 1:04
// o dispatch recebe por parametro uma action
// criar função login
// neste arquivo ficara as funções que retornam a action, quando eu chamo a função retorna o objeto
// email: email o pimeiro é a chave o segundo o que veio
