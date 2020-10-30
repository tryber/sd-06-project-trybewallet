// Coloque aqui suas actions

// export const EMAIL_LOGIN = 'EMAIL_LOGIN';

// const actionsEmailLogin = (email) => ({
//   type: 'EMAIL_LOGIN',
//   email,
// });

// export default actionsEmailLogin;

export const addRegister = (value) => ({ type: 'ADD_REGISTER', data: value });
export const deleteRegister = (value) => ({ type: 'DELETE_REGISTER', value });
export const login = (value) => ({ type: 'LOGIN', value });
