export const USER_EMAIL = 'USER_EMAIL';
export const WALLET_CHANGES = 'WALLET_CHANGES';

export const addUserEmail = email => {
  return ({
    type: USER_EMAIL,
    payload: email,
  });
};
