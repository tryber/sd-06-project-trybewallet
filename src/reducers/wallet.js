// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_FECTH_SUCESS, ADD_NEW_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCIES_FECTH_SUCESS:
    return {
      ...state,
      currencies: Object.keys(action.currencies).filter((cur) => cur !== 'USDT'),
    };
  case ADD_NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}
