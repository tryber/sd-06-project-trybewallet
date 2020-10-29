export const SAVE_USER = 'SAVE_USER';
// export const SEARCH_WALLET = 'SEARCH_WALLET';

export const user = (email) => (
  {
    type: SAVE_USER,
    email,
  }
);

export const wallet = () => (
  { type: 'WALLET' }
);
