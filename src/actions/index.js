export const EMAIL_LOGIN = 'EMAIL_LOGIN';

export const addEmail = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export default addEmail;
