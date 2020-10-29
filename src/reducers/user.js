import { EMAIL } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: []
  }
}

export default function userReducer(state = INITIAL_STATE, action) {
  switch(action.type) {
    case EMAIL:
      return { ...state, user: {email: action.payload}}
    default:
      return state
  }
}
