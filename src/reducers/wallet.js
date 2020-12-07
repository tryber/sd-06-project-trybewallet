// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  EXPENSES,
  LOAD_CURRENCIES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
} from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function registerExpense(state, action) {
  const {
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates,
  } = action.payload;
  const walletExpense = state.expenses;
  const id = walletExpense.length;
  const infoExpense = { id, value, description, currency, method, tag, exchangeRates };
  const actualExpense = [...walletExpense, infoExpense];

  return { ...state, expenses: actualExpense };
}

function sendEditExpense(state, action) {
  const {
    idExpenseEdit: id,
    tag,
    description,
    currency,
    method,
    value,
  } = action;
  console.log('id ação editar', id);
  const expensesExistent = state.expenses;
  const reciveEdit = { id, tag, description, currency, method, value };
  const atualExpense = expensesExistent.map((expense) => {
    if (expense.id !== id) {
      return expense;
    }
    return { ...expense, ...reciveEdit };
  });
  return { ...state, expenses: atualExpense };
}

function reciveCurrencies(state, action) {
  const { currencies } = action.payload;
  return { ...state, currencies };
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case EXPENSES:
    return registerExpense(state, action);
  case LOAD_CURRENCIES:
    return reciveCurrencies(state, action);
  case DELETE_EXPENSE: {
    const newExpenses = state.expenses.filter((expense) => expense.id !== action.id);
    return {
      ...state,
      expenses: newExpenses,
    };
  }
  case EDIT_EXPENSE:
    return sendEditExpense(state, action);
  default:
    return state;
  }
}
