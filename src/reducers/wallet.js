import { SV_EXPENSES, CURRENCIES, DEL_EXPENSES } from '../actions';

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
  case DEL_EXPENSES: {
    const newExpenses = state.expenses.filter((item) => item.id !== action.id);
    return ({
      ...state,
      expenses: newExpenses,
    });
  }
  default:
    return state;
  }
}
