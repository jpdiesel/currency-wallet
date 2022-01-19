// Coloque aqui suas actions

const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveEmailAction = (value) => ({ type: SAVE_EMAIL, value });
const saveExpensesAction = (value) => ({ type: SAVE_EXPENSES, value });
export const saveApiAction = (value) => ({ type: SAVE_CURRENCIES, value });

export function fetchCurrencies() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(saveApiAction(currencies)));
  };
}

export function fetchExpenses(infos) {
  return async (dispatch) => {
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
    dispatch(saveExpensesAction(expenses));
  };
}

export default SAVE_EMAIL;
