// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_CURRENCIES_SUCCESS,
  EXPENSES_SAVE,
  ADDTOTAL,
  DELETE_ITEM,
  EXP_EDIT_BUTTON,
  IS_EDITING,
  ADD_EDITION,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  id: 0,
  isEditing: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return (
      {
        ...state,
        currencies: [...state.currencies, ...Object.keys(action.currencies)]
          .filter((currency) => currency !== 'USDT'),
      }
    );
  case EXPENSES_SAVE:
    return (
      {
        ...state,
        expenses: [...state.expenses, { ...action.expenses, id: state.id }],
        id: state.id + 1,
      }
    );
  case IS_EDITING:
    return (
      {
        ...state,
        isEditing: action.change,
      }
    );
  case ADD_EDITION:
    return (
      {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.expense.id) {
            return action.expense;
          }
          return expense;
        }),
      }
    );
  case EXP_EDIT_BUTTON:
    return (
      {
        ...state,
        expenses: [...state.expenses, ...action.expenses.id],
      }
    );

  case ADDTOTAL:
    return (
      {
        ...state,
        total: state.expenses.reduce((result, expense) => (
          result + (parseFloat(expense.exchangeRates[expense.currency]
            .ask * expense.value))
        ), 0).toFixed(2),
      }
    );
  case DELETE_ITEM:
    return (
      {
        ...state,
        expenses: state.expenses.filter((expenses) => expenses.id !== action.id),
      }
    );
  default:
    return state;
  }
}
