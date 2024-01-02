// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SAVE_EXPENSES, DELETE_EXPENSE, EDIT_EXPENSE, EDIT_MODE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.value]
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      editMode: false,
      expenses: state.expenses.filter((item) => item.id !== action.value.id)
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.value]
    };
  case EDIT_MODE:
    // console.log(action.value[1])
    if (action.value[0]) {
      return {
        ...state,
        editMode: true,
        rowToEdit: action.value[1]
      }
    } else {
      return {
        ...state,
        editMode: false,
        rowToEdit: '',
      }
    }
  default:
    return state;
  }
}

export default walletReducer;
