import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, editExpenses, editMode, fetchCurrencies, saveExpenses } from '../actions';
import Options from './Options';

const alimentacao = 'Alimentação';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      spentValue: '',
      descriptions: '',
      currencys: 'USD',
      payMethod: 'Dinheiro',
      tags: alimentacao,
      // isAlreadyUpdated: false
    };
    // this.fetchingCodes = this.fetchingCodes.bind(this);
  }

  componentDidMount() {
    // this.fetchingCodes();
    // const { currencyCode } = this.state;
    // console.log(currencyCode);
    const { api } = this.props;
    api();
  }

  componentDidUpdate() {
    const { editMode, rowToEdit } = this.props;
    if (editMode && rowToEdit.id !== this.state.id) {
        this.setState({
          id: rowToEdit.id,
          spentValue: rowToEdit.value,
          descriptions: rowToEdit.description,
          currencys: rowToEdit.currency,
          payMethod: rowToEdit.method,
          tags: rowToEdit.tag
        }); 
    }
  }

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onSubmit = () => {
    const { saveExpenses } = this.props;
    const { id } = this.state;
    this.setState({ id: id + 1 });
    saveExpenses(this.state);
    this.clearForm();
  }

  clearForm = () => {
    this.setState({
      spentValue: '',
      descriptions: '',
      currencys: 'USD',
      payMethod: 'Dinheiro',
      tags: alimentacao,
    });
  }

  // async fetchingCodes() {
  //   const { currencyCode } = this.state;
  //   const apiFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
  //   const data = await apiFetch.json();
  //   this.setState({ currencyCode: data });
  //   console.log(currencyCode);
  // }

  editExpenses = () => {
    const { rowToEdit, editExpense, deleteExpense, changeEditMode } = this.props;
    const { spentValue, descriptions, currencys, payMethod, tags, id } = this.state;
    this.setState({ id: id + 1 });
    const result = {
      id: id,
      spentValue: spentValue,
      descriptions: descriptions,
      currencys: currencys,
      payMethod: payMethod,
      tags: tags,
    }
    deleteExpense(rowToEdit);
    editExpense(result);  
    changeEditMode(false, result);
    this.setState({
      spentValue: '',
      descriptions: '',
      currencys: 'USD',
      payMethod: 'Dinheiro',
      tags: alimentacao,
    });
  }

  render() {
    const {
      spentValue,
      descriptions,
      currencys,
      payMethod,
      tags,
    } = this.state;
    const { currencies, editMode } = this.props;
    return (
      <div>
        {currencies
          ? (
            <section className='settings'>
              <div>
                <label htmlFor="value-input">
                  Valor gasto
                </label>
                <input
                  id="spent-value"
                  type="number"
                  data-testid="value-input"
                  name="spentValue"
                  value={ spentValue }
                  onChange={ this.handleChanges }
                />
              </div>
              <div>
                <label htmlFor="description-input">
                  Descrição
                </label>
                <input
                    type="text"
                    data-testid="description-input"
                    name="descriptions"
                    value={ descriptions }
                    onChange={ this.handleChanges }
                  />
              </div>
              <div>
                <label htmlFor="currencys">
                  Moeda
                </label>
                <select
                    id="currencys"
                    data-testid="currency-input"
                    name="currencys"
                    value={ currencys }
                    onChange={ this.handleChanges }
                  >
                    <Options />
                </select>
              </div>
              <div>
                <label htmlFor='payMethod'>
                  Método de pagamento
                </label>
                <select
                  data-testid="method-input"
                  name="payMethod"
                  value={ payMethod }
                  onChange={ this.handleChanges }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </div>
              <div>
              <label htmlFor='tags'>
                Tags
              </label>
              <select
                data-testid="tag-input"
                name="tags"
                value={ tags }
                onChange={ this.handleChanges }
              >
                <option value={ alimentacao }>Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
             </div>
              { editMode 
              ? <button type='submit' onClick={ this.editExpenses } >Alterar despesa</button>
              : <button type="submit" onClick={ this.onSubmit }>Adicionar despesa</button>
              }
              
            </section>)
          : null}
      </div>
    );
  }
}

// FEITO COM A AJUDA DESSE LINK:
// https://stackoverflow.com/questions/55458675/filter-is-not-a-function

const mapStateToProps = (state) => ({
  currencies: state.api.currencies,
  editMode: state.wallet.editMode,
  rowToEdit: state.wallet.rowToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(saveExpenses(expenses)),
  api: () => dispatch(fetchCurrencies()),
  editExpense: (expenses) => dispatch(editExpenses(expenses)),
  deleteExpense: (expense) => dispatch(deleteExpenses(expense)),
  changeEditMode: (mode, id) => dispatch(editMode(mode, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  saveExpenses: PropTypes.func,
  api: PropTypes.func,
  currencies: PropTypes.object,
}.isRequired;
