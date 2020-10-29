export const EMAIL_UPDATE = 'EMAIL_UPDATE';
export const PASSWORD_UPDATE = 'PASSWORD_UPDATE';

export const emailUpdate = (email) => ({
  type: EMAIL_UPDATE,
  email,
});

export const passwordUpdate = (password) => ({
  type: PASSWORD_UPDATE,
  password,
});
