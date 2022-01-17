import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import fetchExpenses from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currencyCode: {},
      spentValue: 0,
      descriptions: '',
      currencys: 'USD',
      payMethod: 'Dinheiro',
      tags: 'Alimentação',
    };
  }

  componentDidMount() {
    this.fetchingCodes();
  }

  fetchingCodes = async () => {
    const apiFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await apiFetch.json();
    this.setState({ currencyCode: data });
  }

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onSubmit = async () => {
    // const { saveExpenses } = this.props;
    // const { spentValue, descriptions, currencys, payMethod, tags } = this.state;
    const apiFetch = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await apiFetch.json();
    const currencyInfo = Object
      .values(data)
      .filter((currency) => (currency.codein !== 'BRLT'))
      .map((currency) => currency);
    console.log(currencyInfo);
    // // saveExpenses();
  }

  render() {
    const {
      spentValue,
      descriptions,
      currencys,
      payMethod,
      tags,
      currencyCode,
    } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <Header />
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
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              name="currencys"
              value={ currencys }
              onChange={ this.handleChanges }
            >
              { Object
                .values(currencyCode)
                .filter((currency) => (currency.codein !== 'BRLT'))
                .map((currency, index) => (
                  <option
                    key={ index }
                    data-testid={ currency.code }
                  >
                    { currency.code }
                  </option>
                )) }
            </select>
          </label>
          <select
            data-testid="method-input"
            name="payMethod"
            value={ payMethod }
            onChange={ this.handleChanges }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Crédito">Cartão de crédito</option>
            <option value="Débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tags"
            value={ tags }
            onChange={ this.handleChanges }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button type="submit" onClick={ this.onSubmit }>Adicionar despesa</button>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(fetchExpenses(expenses)),
});

export default connect(null, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  saveExpenses: PropTypes.func,
}.isRequired;
