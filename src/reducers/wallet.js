const INITIAL_STATE = {
  currencyToExchange: 'BRL',
  expenses: [],
};

const ADD_EXPENSE = 'ADD_EXPENSE';
const RMV_EXPENSE = 'RMV_EXPENSE';

const wallet = (state = INITIAL_STATE, action) => {
  const { expenses, currencyToExchange } = state;
  const { type, expense } = action;
  // const index = expenses.findIndex((exp) => exp.id === expense.id);
  switch (type) {
  case ADD_EXPENSE:
    return ({
      currencyToExchange,
      expenses: [...expenses, expense],
    });
  case RMV_EXPENSE:
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
