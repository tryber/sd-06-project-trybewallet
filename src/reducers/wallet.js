// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INTIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  data: {},
};

export default function wallet(state = INTIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_DATA':
    return { ...state, loading: true };
  case 'SUCCESS':
    return { ...state, data: action.data, loading: false };
  case 'SAVE_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
}
