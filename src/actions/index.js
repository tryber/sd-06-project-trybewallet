const USER_EMAIL = 'USER_EMAIL';

export const storeUserEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const teste = (testando, setTeste) => ({
  type: 'teste_action',
  expenses: { ...testando, setTeste },
});
