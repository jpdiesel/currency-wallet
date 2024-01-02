import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { deleteExpenses, editMode } from '../actions';

class TableForm extends Component {
  // constructor (){
  //   super();
    // this.state = {
    //   editMode: false,
    // }
    // this.editExpensesMode = this.editExpensesMode.bind(this)
  // }

  componentDidMount() {
    const { infos } = this.props;
    const value = infos.map((currencies) => currencies);
    // console.log(value);
  }

  // componentDidUpdate() {
  //   // const { infos } = this.props;
  //   // // const exchangeRates = infos.map((currency) => currency.exchangeRates);
  //   // // const currency = infos.map((currencies) => currencies.currency);
  //   // if (infos.length > 1) {
  //   //   const nao = Object.entries(infos.map((currency) => currency.exchangeRates).find((moeda) => moeda));
  //   //   console.log(nao);
  //   // }
  // }

  getCurrencyName = (moeda) => {
    const { currency, exchangeRates } = moeda;
    const coin = exchangeRates[currency].name;
    return coin;
  }

  getCurrencyValue = (moeda) => {
    const { currency, exchangeRates } = moeda;
    const coin = exchangeRates[currency].ask;
    return Number(coin).toFixed(2);
  }

  getCurrencyConversion(moeda) {
    const { currency, exchangeRates, value } = moeda;
    const coin = exchangeRates[currency].ask;
    return Number(coin * value).toFixed(2);
  }

  deleteExpenses(expenses) {
    const { deleteExpenses } = this.props;
    deleteExpenses(expenses);
  }

  // editExpensesMode (mode) {
    // const { editMode } = this.state;
    // if (editMode) {
    //   this.setState({ editMode: false })
    // } else {
    //   this.setState({ editMode: true })
    // }
    // console.log(editMode);
  // }

  render() {
    const { infos, editMode } = this.props;
    // console.log(infos)
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
              <th>Editar</th>
               <th>Excluir</th>
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
                    this.getCurrencyName(moeda)
                  }
                </td>
                <td>
                  {
                    this.getCurrencyValue(moeda)
                  }
                </td>
                <td>
                  {
                    this.getCurrencyConversion(moeda)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    onClick={ () => editMode(true, moeda) }
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button 
                    onClick={ () => this.deleteExpenses(moeda) }
                  >
                    Excluir
                  </button>
                </td>
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

const mapDispatchToProps = (dispatch) => ({
  deleteExpenses: (expenses) => dispatch(deleteExpenses(expenses)),
  editMode: (mode, infos) => dispatch(editMode(mode, infos))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableForm);

TableForm.propTypes = {
  description: propTypes.string,
  tag: propTypes.string,
  method: propTypes.string,
  value: propTypes.number,
}.isRequired;
