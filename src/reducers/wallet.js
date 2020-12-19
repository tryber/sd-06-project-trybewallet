// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  CURRENCIES_API,
  ADD_EXPENSES,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  EDIT_ATTRIBUTE,
  REPLACE_EXPENSE,
} from '../actions/WalletForms';

const initialState = {
  total: 0,
  currencies: [],
  expenses: [],
  expense: {
    id: 0,
    value: 0,
    description: '',
    method: 'Dinheiro',
    currency: 'USD',
    tag: 'Alimentação',
  },

};

const removeFromExpenses = (id, state) => [...state.expenses]
  .filter((expense) => expense.id !== id);

const wallet = (state = initialState, action) => {
  const { total } = { ...state };
  const newExpenses = [...state.expenses];
  switch (action.type) {
  case ADD_EXPENSES:

    return { ...state,
      expenses: [...state.expenses, action.expense],
      edit: action.edit,
      total: Number(total + Number(action.expense.value)
       * Number(action.expense.exchangeRates[action.expense.currency].ask)) };

  case CURRENCIES_API:
    return { ...state,
      currencies: Object.keys(action.currencies)
        .filter((currKey) => currKey !== 'USDT') };

  case REMOVE_EXPENSE:
    return { ...state,
      expenses: removeFromExpenses(action.id, state),
      total: [...state.expenses].reduce((acc, expense) => acc
       + Number(expense.value * expense.exchangeRates[expense.currency].ask), 0) };
  case EDIT_EXPENSE:
    return { ...state,
      expenses: [...state.expenses],
      edit: action.edit,
      expense: state.expenses
        .find((expense) => expense.id === action.expense.id),
    };

  case REPLACE_EXPENSE:

    newExpenses[action.expense.id] = action.expense;
    return { ...state,
      expenses: newExpenses,
    };

  case EDIT_ATTRIBUTE:
    return { ...state,
      expense: { ...state.expense, [action.name]: action.value } };

  default:
    return state;
  }
};

export default wallet;
