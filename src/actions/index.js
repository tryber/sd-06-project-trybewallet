const { act } = require("@testing-library/react");

export const SAVE_USER = 'SAVE_USER';


export const user = (email) => (
  {
    type: SAVE_USER,
    email,
  }
);

export const wallet = (ewallet) => (
  {
    type: SAVE_USER,
  }
);
