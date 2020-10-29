// definição: objeto com propriedade type e qq outro valor q eu queria passar
export const LOGIN = 'LOGIN';
// export const WALLET = 'WALLET';

export const login = (email) => ({
  type: LOGIN,
  email,
});

// export const wallet = (currencies, expenses) => ({
//   type: WALLET,
//   currencies,
//   expenses
// });
