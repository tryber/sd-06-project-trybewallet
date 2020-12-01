// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { LOADING_CURRENCIES, CURRENCIES_LOADED, NEW_CURRENCY_SELECTED, TOTAL_MONEY_SPENT,
  NEW_PAYMENT_METHOD, NEW_SELECTED_TAG, NEW_EXPENSE, EXPENSE_EDIT,
  NEW_VALUE_SPENT, NEW_DESCRIPTION, DELETE_EXPENSE, NOW_EDITING_EXPENSE,
  UPDATE_STATE } from '../actions/currencyOptions';
import expenseCreator from '../services/expenseCreator';

const expenseFilter = (itemToRemove, total) => (
  total.filter((expense) => expense !== itemToRemove)
);

const expenseEditor = (itemToEdit, state) => {
  const correctItem = state.expenses.find((expense) => (
    expense === itemToEdit));
  const { exchangeRates, id } = correctItem;
  let editedExpenses = expenseFilter(itemToEdit, state.expenses);
  const newState = { ...state, expenses: editedExpenses };
  editedExpenses = expenseCreator(newState, exchangeRates, id);
  return editedExpenses;
};

const itemBeingEdited = (state, itemToEdit) => {
  const item = state.expenses.find((expense) => expense === itemToEdit);
  return {
    ...state,
    currentCurrency: item.currency,
    paymentMethod: item.method,
    currentTag: item.tag,
    moneySpent: item.value,
    description: item.description,
  };
};

const INITIAL_STATE = {
  loading: true,
  currencies: [],
  currentCurrency: 'USD',
  paymentMethod: 'Dinheiro',
  currentTag: 'Alimentação',
  expenses: [],
  description: '',
  moneySpent: '0',
  totalMoneySpent: '0',
  editing: false,
  idBeingEdited: '',
};

function wallet(state = INITIAL_STATE, action) {
  const { idBeingEdited } = state;
  switch (action.type) {
  case LOADING_CURRENCIES:
    return { ...state, loading: true };
  case NOW_EDITING_EXPENSE:
    return { ...state, editing: true };
  case NEW_DESCRIPTION:
    return { ...state, description: action.description };
  case CURRENCIES_LOADED:
    return { ...state, loading: false, currencies: action.currencies };
  case NEW_CURRENCY_SELECTED:
    return { ...state, currentCurrency: action.selectedCurrency };
  case NEW_PAYMENT_METHOD:
    return { ...state, paymentMethod: action.paymentMethod };
  case NEW_SELECTED_TAG:
    return { ...state, currentTag: action.newTag };
  case NEW_VALUE_SPENT:
    return { ...state, moneySpent: action.moneySpent };
  case NEW_EXPENSE:
    return { ...state, expenses: expenseCreator(state, action.currentCotation) };
  case DELETE_EXPENSE:
    return { ...state, expenses: expenseFilter(action.id, state.expenses) };
  case TOTAL_MONEY_SPENT:
    return { ...state, totalMoneySpent: action.total };
  case UPDATE_STATE:
    return { ...itemBeingEdited(state, action.id), idBeingEdited: action.id };
  case EXPENSE_EDIT:
    return { ...state, editing: false, expenses: expenseEditor(idBeingEdited, state) };
  default:
    return state;
  }
}

export default wallet;
