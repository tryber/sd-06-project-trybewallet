// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {

  currencies: [],
  expenses: [],
  editar: {},
  id: 0,
};

function wallet(state = INITIAL_STATE, action) {
  const { payload } = action;

  switch (action.type) {
  case 'ADD_WALLET':

    return {
      ...state,
      expenses: [...state.expenses, payload.expenses],
      currencies: [...state.currencies, payload.currencies],
    };
  case 'EDITAR':
    return {
      ...state,
      editar: payload.editar,
    };
  case 'EXPENSES':
    return {
      ...state,
      expenses: action.expenses,
    };
  case 'ID':   
    return {
      ...state,
      id: action.id + 1,
    };
  default:
    return state;
  }
}

export default wallet;
