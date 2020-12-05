const USER_EMAIL = 'USER_EMAIL';

const storeUserEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export default storeUserEmail;
