export const HANDLE_USER = 'HANDLE_USER';

const setEmailForm = (email) => ({
  type: HANDLE_USER,
  email,
});

export default setEmailForm;
