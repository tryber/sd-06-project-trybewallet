// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// import { GET_DATA, SAVE, ID_INCREMENT, TOTAL_FIELD } from '../actions';
import {
  DEL_EXPENSE,
  GET_DATA, SAVE,
  ID_INCREMENT,
  TOTAL_FIELD,
  EXCHANGE_DATA,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  id: 0,
  totalField: 0,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_DATA:
    return {
      ...state,
      currencies: Object.keys(action.responseJson)
        .filter((coin) => coin !== 'USDT'),
    };

  case SAVE:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.expense, id: state.id }],
    };

  case ID_INCREMENT:
    return {
      ...state,
      id: state.id + 1,
    };
  // case TOTAL_FIELD:
  //   return {
  //     ...state,
  //     totalField: state.expenses.totalField + state.expenses.value,
  //     // numeros.reduce((total, numero) => total + numero, 0);
  //     // totalField: state.totalField.reduce((prev, elem) => prev + elem, 0)
  //     // totalField: [...state.expenses, { ...action.expense.value, totalField: state.totalField.value }],
  //   };
  case TOTAL_FIELD:
    return {
      ...state,
      totalField: (parseFloat((state.expenses)
        .reduce(((acc, elem) => acc + (elem.value) * elem.exchangeRates[elem.currency]
          .ask), 0)).toFixed(2)),
    };
  case EXCHANGE_DATA:
    return {
      ...state,
    };
  // // ------------------------------------------------------------------------
  case DEL_EXPENSE: {
    const filteredExpenses = state.expenses.filter(
      (item) => item.id !== action.expense.id,
    );
    const Total = state.totalField - action.expense.value;// valor final do gas
    return {
      ...state,
      expenses: [...filteredExpenses],
      totalField: Total,
    };
  }
  // case DEL_EXPENSE:
  //   return { ...state,
  //     expenses: state.expenses.filter((exp) => exp.id !== action.expense) };

  default:
    return state;
  }
}
