import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, fetchExpenses } from '../actions';
import Options from './Options';

const alimentacao = 'Alimentação';

class WalletForm extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      spentValue: 0,
      descriptions: '',
      currencys: 'USD',
      payMethod: 'Dinheiro',
      tags: alimentacao,
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
      spentValue: 0,
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

  render() {
    const {
      spentValue,
      descriptions,
      currencys,
      payMethod,
      tags,
    } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        {currencies
          ? (
            <section>
              <label htmlFor="value-input">
                Valor gasto
                <input
                  type="number"
                  data-testid="value-input"
                  name="spentValue"
                  value={ spentValue }
                  onChange={ this.handleChanges }
                />
              </label>
              <label htmlFor="description-input">
                Descrição
                <input
                  type="text"
                  data-testid="description-input"
                  name="descriptions"
                  value={ descriptions }
                  onChange={ this.handleChanges }
                />
              </label>
              <label htmlFor="currencys">
                Moeda
                <select
                  id="currencys"
                  data-testid="currency-input"
                  name="currencys"
                  value={ currencys }
                  onChange={ this.handleChanges }
                >
                  <Options />
                </select>
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
              <button type="submit" onClick={ this.onSubmit }>Adicionar despesa</button>
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
});

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(fetchExpenses(expenses)),
  api: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);

WalletForm.propTypes = {
  saveExpenses: PropTypes.func,
  api: PropTypes.func,
  currencies: PropTypes.object,
}.isRequired;
