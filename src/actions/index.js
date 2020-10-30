// Coloque aqui suas actions
export default addEmailToRecord = ({ email }) => ({
  type: 'addRecord',
  payload: {
    email,
  },
});
