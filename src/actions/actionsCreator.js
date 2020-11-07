export const LOGIN = 'LOGIN';

function loginAction({ email }) {
  return {
    type: LOGIN,
    payload: {
      email,
      signedIn,
    },
  };
}
