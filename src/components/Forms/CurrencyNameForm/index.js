import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';

class CurrencyNameForm extends React.Component {
  render() {
    const { genericHandleChange, allCurrencies } = this.props;
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          data-testid="currency-input"
          id="currency"
          name="currency"
          className="currency"
          onChange={ (event) => genericHandleChange(event) }
        >
          {Object.keys(allCurrencies)
            .filter((currency) => currency !== 'USDT').map((currency) => (
              <option
                key={ `${currency}` }
                data-testid={ `${currency}` }
                value={ `${currency}` }
              >
                {currency}
              </option>))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  allCurrencies: state.wallet.currencies,
});

CurrencyNameForm.propTypes = {
  genericHandleChange: PropTypes.func.isRequired,
  allCurrencies: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(CurrencyNameForm);
