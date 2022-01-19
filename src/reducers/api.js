import { SAVE_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

function apiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_CURRENCIES:
    return {
      currencies: action.value,
    };
  default:
    return state;
  }
}

export default apiReducer;
