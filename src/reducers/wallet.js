import { RESPONSE,
  ADD_EXPENSE, DEL_EXPENSE, EDIT_EXPENSE, ID_SAVE, BTN_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idSave: null,
  editExpense: null,
  id: 0,
  btnEdit: false,
  elementEdit: [],
  editId: null,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case '':
    return;
  case RESPONSE:
    return { ...state, currencies: action.prices };
  case ADD_EXPENSE:
    return { ...state,
      expenses: [...state.expenses,
        { ...action.expense, exchangeRates: action.exchangeRates, id: state.id }],
      id: state.id + 1,
    };
  case DEL_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((item) => (item.id !== action.id)),
    };
  case EDIT_EXPENSE:
    return { ...state,
      editExpense: action.expense,
    };
  case ID_SAVE:
    return { ...state,
      idSave: action.id,
    };
  case BTN_EDIT:
    return { ...state,
      btnEdit: !state.btnEdit,
      editId: action.editId,
    };
  default:
    return state;
  }
}

export default wallet;
