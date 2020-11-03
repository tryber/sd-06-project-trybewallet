const INITIAL_STATE = {
  total: 0,
};

export default function wallet(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case 'lalalla':
    return ({ ...state, payload });
  default:
    return state;
  }
}
