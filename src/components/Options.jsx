import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Options extends React.Component {
  render() {
    const { currencies } = this.props;
    return (
      <>
        {Object
          .values(currencies)
          .filter((currency) => (
            currency.codein !== 'BRLT' && currency.code !== 'DOGE'))
          .map((currency, index) => (
            <option
              key={ index }
              data-testid={ currency.code }
              value={ currency.code }
            >
              {currency.code}
            </option>
          ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.api.currencies,
});

Options.propTypes = {
  currencies: PropTypes.objectOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Options);
