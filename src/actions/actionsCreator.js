export const LOGIN = 'LOGIN';

export function user({ email }) {
  return {
    type: LOGIN,
    payload: {
      email,
    },
  };
}
