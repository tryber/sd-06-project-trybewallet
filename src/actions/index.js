export const LOGIN = 'LOGIN';
// export const WALLET = 'WALLET';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

// export const currenciesAction = (currencies, expenses) => ({
//   type: WALLET,
//   currencies,
//   expenses,
// });

// action -> objeto com a propriedade type e mais qualquer outra chave que eu quiser
// email->e-mail
