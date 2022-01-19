import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

// const emptyArr = [];

class TableForm extends Component {
  getCurrencyName = () => {
    const { infos } = this.props;
    if (infos) {
      const exchangeRates = infos.map((currency) => currency.exchangeRates);
      const currency = infos.map((currencies) => currencies.currency);
      return Object
        .entries(...exchangeRates)
        .find((moeda) => moeda[0] === currency[0])[1].name;
    }
  }

  getCurrencyValue = () => {
    const { infos } = this.props;
    if (infos) {
      const exchangeRates = infos.map((currency) => currency.exchangeRates);
      const currency = infos.map((currencies) => currencies.currency);
      return Number(Object
        .entries(...exchangeRates)
        .find((moeda) => moeda[0] === currency[0])[1].ask)
        .toFixed(2);
    }
  }

  getCurrencyConversion() {
    const { infos } = this.props;
    if (infos) {
      const exchangeRates = infos.map((currency) => currency.exchangeRates);
      const currency = infos.map((currencies) => currencies.currency);
      const value = infos.map((currencies) => currencies.value);
      const total = Number(Object
        .entries(...exchangeRates)
        .find((moeda) => moeda[0] === currency[0])[1].ask)
        * Number(value[0]);
      return total.toFixed(2);
    }
  }

  render() {
    const { infos } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {infos.map((moeda, index) => (
              <tr key={ index }>
                <td>{moeda.description}</td>
                <td>{moeda.tag}</td>
                <td>{moeda.method}</td>
                <td>{moeda.value}</td>
                <td>
                  {
                    this.getCurrencyName()
                  }
                </td>
                <td>
                  {
                    this.getCurrencyValue()
                  }
                </td>
                <td>
                  {
                    this.getCurrencyConversion()
                  }
                </td>
                <td>Real</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  description: state.wallet.expenses.description,
  tag: state.wallet.expenses.tag,
  method: state.wallet.expenses.method,
  value: state.wallet.expenses.value,
  infos: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(TableForm);

TableForm.propTypes = {
  description: propTypes.string,
  tag: propTypes.string,
  method: propTypes.string,
  value: propTypes.number,
}.isRequired;
