import { SV_EXPENSES, CURRENCIES } from '../actions';

const initialState = {
  currencyDefault: 'BRL',
  listId: 0,
  currencies: [],
  expenses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SV_EXPENSES:
    return ({
      ...state,
      listId: state.listId + 1,
      expenses: [
        ...state.expenses,
        {
          id: state.listId,
          ...action.payload,
        }],
    });
  default:
    return state;
  }
}
