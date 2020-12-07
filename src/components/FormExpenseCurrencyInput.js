import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormExpenseCurrencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { currency, handleChange } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          // value={ currency }
          onChange={ handleChange }
          data-testid="currency-input"
          id="currency"
        >
          {Object.keys(currency).map((curr) => (
            <option
              key={ curr }
              value={ curr }
              data-testid={ curr }
            >
              {curr}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

export default connect(mapStateToProps)(FormExpenseCurrencyInput);

FormExpenseCurrencyInput.propTypes = {
  currency: PropTypes.arrayOf.isRequired,
  handleChange: PropTypes.func.isRequired,
};
