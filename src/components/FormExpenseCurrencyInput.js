import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FormExpenseCurrencyInput extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { currency } = this.props;
    console.log(currency);
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          value={ currency }
          onChange={ (event) => this.handleChange(event) }
          data-testid="currency-input"
          id="currency"
        >
          {Object.keys(currency).map((curr) => (
            <option
              key={ curr }
              value={ curr }
              data-testis={ curr }
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
  // currenciesState: state.wallet.currencies,
});

export default connect(mapStateToProps)(FormExpenseCurrencyInput);

FormExpenseCurrencyInput.propTypes = {

}
