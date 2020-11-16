import { GET_DATA, SAVE, ID_INCREMENT, TOTAL_FIELD } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  totalField: [],
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_DATA:
    return {
      ...state,
      currencies: Object.keys(action.responseJson)
        .filter((coin) => coin !== 'USDT'),
    };
  case SAVE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expense, id: state.id }],
    };
  case ID_INCREMENT:
    return {
      ...state,
      id: state.id + 1,
    };
  case TOTAL_FIELD:
    return {
      ...state,
      // numeros.reduce((total, numero) => total + numero, 0);
      // totalField: state.totalField.reduce((prev, elem) => prev + elem, 0)
      totalField: [...state.expenses, { ...action.expense.value, totalField: state.totalField.value }],
    };
  default:
    return state;
  }
}
