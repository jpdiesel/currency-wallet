// Coloque aqui suas actions

const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_MODE = 'EDIT_MODE';

export const saveEmailAction = (value) => ({ type: SAVE_EMAIL, value });
const saveExpensesAction = (value) => ({ type: SAVE_EXPENSES, value });
export const saveApiAction = (value) => ({ type: SAVE_CURRENCIES, value });
export const deleteExpenseAction = (value) => ({ type: DELETE_EXPENSE, value });
export const editExpenseAction = (value) => ({ type: EDIT_EXPENSE, value });
export const editModeAction = (value) => ({ type: EDIT_MODE, value })

export function fetchCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(saveApiAction(currencies)));
  };
}

export function saveExpenses(infos) {
  return async (dispatch) => {
    const expenses = await genericFetch(infos)
    dispatch(saveExpensesAction(expenses));
  };
}

export function deleteExpenses(infos) {
  return async (dispatch) => {
    const expenses = await genericFetch(infos)
    dispatch(deleteExpenseAction(expenses))
  }
}

export function editExpenses(infos) {
  // console.log(infos)
  return async (dispatch) => {
    const expenses = await genericFetch(infos)
    dispatch(editExpenseAction(expenses));
  };
}

export function editMode(mode, infos) {
  return (dispatch) => {
    dispatch(editModeAction([mode, infos]));
  }
}

async function genericFetch(infos) {
  const apiFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await apiFetch.json();
    const expenses = {
      id: infos.id,
      value: infos.spentValue,
      description: infos.descriptions,
      currency: infos.currencys,
      method: infos.payMethod,
      tag: infos.tags,
      exchangeRates: data,
    };
    return expenses;
}

export default SAVE_EMAIL;
