// Coloque aqui suas actions

// salvando usuario pelo email
export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const actionsEmailLogin = (email) => ({
  type: 'EMAIL_LOGIN',
  payload: email,
});

// salvando total da carteira
export const TOTAL_WALLET = 'TOTAL_WALLET';
export const totalField = (payload) => ({
  type: TOTAL_WALLET,
  payload,
});

// salvando password
export const SAVE_PASSWORD = 'SAVE_PASSWORD';
export const savePassword = (password) => ({
  type: SAVE_PASSWORD,
  password,
});

// export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });

// export default actionsEmailLogin;

// export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });
// export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });
// export const login = (value) => ({ type: 'LOGIN', value });
