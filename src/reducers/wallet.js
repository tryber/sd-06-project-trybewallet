// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
// const INITIAL_STATE = {
//   wallet: {
//     currencies: [],
//     expenses: [],
//   },
// };

// export default function (state = INITIAL_STATE, action) {
//   // retorna um novo estado baseado no type da action
//   switch (action.type) {
//   case '':
//     return;
//   default:
//     return state;
//   }
// }

import { TOTAL_WALLET } from '../actions';

const INITIAL_STATE = {
  total: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOTAL_WALLET:
    return {
      ...state, total: action.payload,
    };
  default:
    return state;
  }
}
