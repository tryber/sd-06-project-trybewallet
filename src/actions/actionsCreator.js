export const LOGIN = 'LOGIN';

export function loginAction({ email, password }) {
  return {
    type: LOGIN,
    payload: {
      email,
      password,
    },
  };
}
