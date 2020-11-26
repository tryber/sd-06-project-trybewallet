// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  checked: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SELECTCURRENCY':
    return { ...state, currencies: action.currency };
  case 'ADDEXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'DELETEEXPENSE':
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expense.id) };
  case 'TOTALHEADER':
    return { ...state,
      total: state
        .expenses
        .reduce(
          (total, atual) => (atual.value * atual.exchangeRates[atual.currency]
            .ask + total), 0,
        ).toFixed(2) };
  case 'IS_EDITING':
    return { ...state,
      checked: action.condition,
    };
  default:
    return state;
  }
}
