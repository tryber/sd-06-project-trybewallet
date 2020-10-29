export const LOG = 'LOG';

export function logAction(email = '') {
  return {
    type: LOG,
    email,
  };
}

const SOMETHING = 'SM';

export function moneyCall() {
  return { type: SOMETHING };
}
