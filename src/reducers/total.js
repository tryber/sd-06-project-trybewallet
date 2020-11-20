const INITIAL_STATE = {
  total: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADDTOTAL':
    return { ...state, total: action.newTotal };
  default:
    return state;
  }
}
