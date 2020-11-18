export const EMAIL_LOGIN = 'EMAIL_LOGIN';
export const TOTAL_FIELD = 'TOTAL_FIELD';

export const addEmail = (email) => ({
  type: EMAIL_LOGIN,
  email,
});

export const totalField = (total) => ({
  type: TOTAL_FIELD,
  total,
});
