export const SAVE_USER = 'SAVE_USER';

export const saveUser = (userEmail) => ({
  type: SAVE_USER,
  payload: userEmail,
});

export const SAVE_WALLET = 'SAVE_WALLET';

export const saveWallet = (payload) => ({
  type: SAVE_WALLET,
  payload,
});
