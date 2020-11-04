export default function userLogin(email) {
  return {
    type: 'USER_LOGIN',
    payload: email,
  };
}
