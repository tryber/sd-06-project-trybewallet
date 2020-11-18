// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SELECTCURRENCY':
    return { ...state, currencies: action.currency };
  case 'ADDEXPENSE':
    return { ...state, expenses: action.expense };
  default:
    return state;
  }
}
