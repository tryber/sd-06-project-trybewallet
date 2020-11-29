// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { LOADING_CURRENCIES, CURRENCIES_LOADED, NEW_CURRENCY_SELECTED, TOTAL_MONEY_SPENT,
  NEW_PAYMENT_METHOD, NEW_SELECTED_TAG, NEW_EXPENSE,
  NEW_VALUE_SPENT, NEW_DESCRIPTION } from '../actions/currencyOptions';
import expenseCreator from '../services/expenseCreator';

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
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_CURRENCIES:
    return { ...state, loading: true };
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
  case TOTAL_MONEY_SPENT:
    return { ...state, totalMoneySpent: action.total };
  default:
    return state;
  }
}

export default wallet;
