// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  // retorna um novo estado baseado no type da action
  switch (action.type) {
  case 'ATT_CURRENCIES':
    return { ...state, currencies: [...state.currencies, action.currencies] };
  case 'ATT_EXCHANGERATES':
    return {
      ...state,
      expenses: [...state.expenses,
        { ...action.expenses,
          exchangeRates: action.exchangeRates }] };
  case 'DELL_CURRENCY':
    return {
      ...state,
      expenses: state.expenses.filter((element) => element.id !== action.line),
    };
  default:
    return state;
  }
}
