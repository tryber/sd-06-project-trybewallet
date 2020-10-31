export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';

export const emailLogin = (email) => ({
  type: EMAIL,
  email: email,
});

export const passwordLogin = (password) => ({
  type: PASSWORD,
  password: password,
});

// payload = {
//   email: 'alguma coisa',
//   password: 'outra coisa'
// }
