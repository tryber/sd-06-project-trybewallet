// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'CURRENCY':
    return { ...state, currencies: action.code };
  case 'EXPENSES':
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...action.expense.expenses,
        }
      ],
      total: action.expense.total,
    };
  default:
    return state;
  }
};

export default wallet;
