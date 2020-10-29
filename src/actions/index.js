export const SAVE_USER = 'SAVE_USER';

export const user = (email) => (
  {
    type: SAVE_USER,
    email,
  }
);
