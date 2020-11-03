// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
    currencies: [],
    expenses: [],
    exchangeTest: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    // retorna um novo estado baseado no type da action
    switch(action.type){
    case 'ATT_EXPENSES':
      return { ...state , expenses: [...state.expenses, action.expenses] };
    case 'ATT_CURRENCIES':
      return { ...state, currencies: [...state.currencies, action.currencies] }
    case 'ATT_EXCHANGERATES':
      return {...state, exchangeTest: action.exchangeRatesJson}
    default:
      return state;
    }
  }