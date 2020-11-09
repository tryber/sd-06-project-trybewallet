const INITIAL_STATE = {
  currencyToExchange: 'BRL',
  expenses: [],
};

const EXPENSE_HDL = 'EXPENSE_HDL';
const EXPENSE_DEL = 'EXPENSE_DEL';

const wallet = (state = INITIAL_STATE, action) => {
  const { expenses, currencyToExchange } = state;
  const { type, expense } = action;

  switch (type) {
  case EXPENSE_HDL:
    return ({
      currencyToExchange,
      expenses: [...expenses, expense],
    });
  case EXPENSE_DEL:
    return ({
      currencyToExchange,
      expenses: [
        ...expenses.slice(0, expenses.findIndex((exp) => exp.id === expense.id)),
        ...expenses.slice(expenses.findIndex((exp) => exp.id === expense.id) + 1),
      ],
    });
  default:
    return state;
  }
};

export default wallet;
