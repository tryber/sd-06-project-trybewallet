// definição: objeto com propriedade type e qq outro valor q eu queria passar
export const LOGIN = 'LOGIN'

export const login = (email) => ({
  type: LOGIN,
  email,
});
//dica primeira action: criar função