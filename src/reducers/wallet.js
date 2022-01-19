// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { SAVE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [action.value],
    };
  default:
    return state;
  }
}

export default walletReducer;
