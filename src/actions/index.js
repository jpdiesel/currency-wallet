// Coloque aqui suas actions

const SAVE_EMAIL = 'SAVE_EMAIL';
const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const saveEmailAction = (value) => ({ type: SAVE_EMAIL, value });
const saveExpensesAction = (value) => ({ type: SAVE_EXPENSES, value });

export function fetchExpenses(infos) {
  return async (dispatch) => {
    const apiFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await apiFetch.json();
    console.log(infos);
    dispatch(saveExpensesAction());
  };
}

export default SAVE_EMAIL;
