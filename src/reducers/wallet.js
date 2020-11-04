import {
  ADD_EXPENSES,
  REQUEST_CURRENCIES_PRICE,
  RECEIVE_CURRENCIES_PRICE,
  REMOVE_EXPENSES,
  EDIT_ENTRY,
  EDIT_EXPENSE,
  EDIT_EACH_FIELD_EXPENSE_BAR,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  totalExpenses: 0,
  isFetching: false,
  isEditing: false,
  expenseEditingBar: {
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
  },
};

export default function wallet(state = INITIAL_STATE, action) {
  const expensesArray = [...state.expenses];
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          ...state.expenseEditingBar,
          id: Object.keys(state.expenses).length,
          exchangeRates: state.currencies[0],
        },
      ],
      totalExpenses: action.totalExpenses,
    };
  case EDIT_EXPENSE:
    expensesArray[state.expenseEditingBar.id] = state.expenseEditingBar;
    return {
      ...state,
      expenses: expensesArray,
      totalExpenses: expensesArray
        .map((expense) => (parseFloat(expense.value)
          * parseFloat(expense.exchangeRates[expense.currency].ask)))
        .reduce((acc, item) => acc + item),
      isEditing: false,
      expenseEditingBar: {
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    };
  case REMOVE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((_, indexExpense) => indexExpense !== action.index),
      totalExpenses: expensesArray
        .map((expense) => (parseFloat(expense.value)
          * parseFloat(expense.exchangeRates[expense.currency].ask)))
        .reduce((acc, item) => acc + item)
        - (expensesArray[action.index].value
        * expensesArray[action.index]
          .exchangeRates[expensesArray[action.index].currency].ask),
    };
  case REQUEST_CURRENCIES_PRICE:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES_PRICE:
    return {
      ...state,
      currencies: [action.prices],
      isFetching: false,
    };
  case EDIT_ENTRY:
    return {
      ...state,
      isEditing: action.boolValue,
      expenseEditingBar: state.expenses[action.index],
    };
  case EDIT_EACH_FIELD_EXPENSE_BAR:
    return {
      ...state,
      expenseEditingBar: {
        ...state.expenseEditingBar,
        [action.key]: action.value,
      },
    };
  default:
    return state;
  }
}
