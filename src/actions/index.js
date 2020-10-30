// Coloque aqui suas actions
const addEmailToRecord = (email) => ({
  type: 'addEmail',
  payload: {
    email,
  },
});

export default addEmailToRecord;
