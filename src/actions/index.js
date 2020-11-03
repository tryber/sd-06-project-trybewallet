// Coloque aqui suas actions

export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const TOTAL_WALLET = 'TOTAL_WALLET';

export const actionsEmailLogin = (email) => ({
  type: 'EMAIL_LOGIN',
  email,
});

export const totalField = (total) => ({
  type: TOTAL_WALLET,
  total,
});

// export default actionsEmailLogin;

// export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });
// export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });
// export const login = (value) => ({ type: 'LOGIN', value });
