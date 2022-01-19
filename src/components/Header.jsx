import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  expensesSum = (moeda) => moeda.reduce((acc, curr) => {
    const { currency, exchangeRates, value } = curr;
    const coin = exchangeRates[currency].ask;
    return Number(Number(coin * value) + Number(acc)).toFixed(2);
  }, 0);

  render() {
    const { email, infos } = this.props;
    return (
      <header>
        <p data-testid="email-field">{ email }</p>
        <div data-testid="total-field">
          { this.expensesSum(infos) }
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
