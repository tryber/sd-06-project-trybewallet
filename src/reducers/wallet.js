import { GET_DATA, SAVE_EXPENSES } from '../actions';

const initialState = {
  expenses: [],
  currencies: [],
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case GET_DATA:
    return { ...state, currencies: Object.keys(action.json).filter((c) => c !== 'USDT') };
  case SAVE_EXPENSES:
    return { ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
}
