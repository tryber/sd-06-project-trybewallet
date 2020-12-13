// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const initialState = {
  currencies: [],
  expenses: [],
};

export default function walletAction(state = initialState, action) {
  switch (action.type) {
  case 'FETCHCURRENCSUCCESS':
    return { ...state, currencies: action.payload };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'DELETE_EXPENSE':
    return { ...state,
      expenses: state.expenses.filter((el) => el.id !== action.payload) };
  default: return state;
  }
}
