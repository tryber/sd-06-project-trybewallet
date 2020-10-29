const INITIAL_STATE = [];

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return [...state, action.value];
  default:
    return state;
  }
}
