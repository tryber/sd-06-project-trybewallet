// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SELECTCURRENCY':
    return { ...state, currencies: action.currency };
  case 'ADDEXPENSE':
    return { ...state, expenses: state.expenses.concat(action.expense) };
  case 'DELETEEXPENSE':
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expense.id) };
  case 'ADDTOTAL':
    return { ...state, total: state.total + action.newTotal };
  case 'DELETETOTAL':
    return { ...state, total: state.total - parseFloat(action.newTotal) };
  default:
    return state;
  }
}
