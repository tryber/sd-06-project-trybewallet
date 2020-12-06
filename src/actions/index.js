export const USER_EMAIL = 'USER_EMAIL';
// export const SAVE_USER = 'SAVE_USER';

export const getUserEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const teste = (testando, setTeste) => ({
  type: 'teste_action',
  expenses: { ...testando, setTeste },
});
