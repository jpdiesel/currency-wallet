import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const emptyArr = [];

class Header extends Component {
  constructor() {
    super();
    this.state = {
      valueSpent: 0,
    };
  }

  componentDidUpdate(prevProps) {
    const { infos } = this.props;
    if (prevProps.infos !== infos) {
      this.expensesSum();
    }
  }

  expensesSum = () => {
    const { infos } = this.props;
    const exchangeRates = infos.map((currency) => currency.exchangeRates);
    const currency = infos.map((currencies) => currencies.currency);
    const value = infos.map((currencies) => currencies.value);
    emptyArr
      .push(Number(value[0]) * Number(Object
        .entries(...exchangeRates)
        .find((moeda) => moeda[0] === currency[0])[1].ask));
    const total = emptyArr.reduce((previous, current) => previous + current).toFixed(2);
    this.setState({ valueSpent: total });
  };

  render() {
    const { valueSpent } = this.state;
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <div data-testid="total-field">
          { Number(valueSpent) }
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  infos: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  email: propTypes.string,
  infos: propTypes.object,
}.isRequired;
