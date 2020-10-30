// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
export const WALLET_INPUT = 'WALLET_INPUT';

const initialState = {
  currencies: [],
  expenses: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case WALLET_INPUT:
    return { ...state };
  default:
    return state;
  }
}
