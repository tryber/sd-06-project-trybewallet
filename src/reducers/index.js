import { LOGIN } from '../actions';

const initialState = {
    user: {
        email: '',
    },

    wallet: {
        currencies: [],
        expenses: [],
    }
};

function reducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return { ...state, user: { email: action.email }};
        default:
            return state;

    }
}

export default reducer;