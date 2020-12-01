export const EMAIL = 'EMAIL';
export const EMAIL_CHANGE = 'EMAIL_CHANGE';

export function emailReady(email) {
  return ({
    type: EMAIL,
    email,
  });
}
