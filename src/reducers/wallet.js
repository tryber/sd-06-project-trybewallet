const REQUEST_API = 'REQUEST_API';
const GET_CURRENCIES = 'GET_CURRENCIES';
const FAILED_REQUEST = 'FAILED_REQUEST';
const ADD_EXPENSE = 'ADD_EXPENSE';
const UPDATE_TOTAL = 'UPDATE_TOTAL';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: false,
  total: 0,
  error: '',
  data: {},
};

function wallet(state = INITIAL_STATE, { type, data, error, expenseData, total, expenseId }) {
  switch (type) {
  case REQUEST_API:
    return { ...state, isLoading: true };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: Object.keys(data).filter((k) => k !== 'USDT'),
      isLoading: false,
      data,
    };
  case FAILED_REQUEST:
    return { ...state, error, isLoading: false };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...expenseData,
        },
      ],
    };
  case UPDATE_TOTAL:
    return {
      ...state,
      total: state.total + total,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((exp) => exp.id !== expenseId),
    }
  default:
    return state;
  }
}

export default wallet;
