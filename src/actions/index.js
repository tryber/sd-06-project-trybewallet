// Coloque aqui suas actions
const addEmailToRecord = (email) => ({
  type: 'addRecord',
  payload: {
    email,
  },
});

export default addEmailToRecord;
