export const WALLET_INPUT = "WALLET_INPUT";

const initialState = {
  currencies: [],
  expenses: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case WALLET_INPUT:
      return { ...state };
    default:
      return state;
  }
}