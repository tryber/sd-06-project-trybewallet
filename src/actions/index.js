// Coloque aqui suas actions
const addEmailToRecord = (email) => ({
  type: 'addEmail',
  payload: {
    email,
  },
});

const addExpenseToRecord = (expense) => ({
  type: 'addExpense',
  payload: {
    expense,
  },
});

export {
  addEmailToRecord,
  addExpenseToRecord,
};
