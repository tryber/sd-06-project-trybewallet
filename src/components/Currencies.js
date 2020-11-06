import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addCurrencies } from '../actions';

class Currencies extends React.Component {
  constructor(props) {
    super(props);
    this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      currencies: [],
      currency: 'USD',
    };
  }

  componentDidMount() {
    this.fetchCurrencies();
  }

  async fetchCurrencies() {
    const CURRENCIES = Object.keys(await (await fetch('https://economia.awesomeapi.com.br/json/all')).json());
    const FILTERED_CURRENCIES = CURRENCIES.filter((currency) => currency !== 'USDT');
    this.setState({ currencies: FILTERED_CURRENCIES });
  }

  handleChange({ target: { value } }) {
    const { handleCurrencyChange } = this.props;
    this.setState({ currency: value }, () => {
      const { currency } = this.state;
      handleCurrencyChange(currency);
    });
  }

  render() {
    const { currencies } = this.state;
    const { handleChange } = this;
    return (
      <label htmlFor="currencies">
        Currency:
        <select
          data-testid="currency-input"
          id="currencies"
          onChange={ handleChange }
        >
          {currencies.map((currency) => (
            <option
              data-testid={ currency }
              key={ currency }
              value={ currency }
              name="currency"
            >
              { currency }
            </option>
          ))}
        </select>
      </label>
    );
  }
}

const mapDispatchToProps = (disp) => ({ addCoin: () => disp(addCurrencies(this.state)) });

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

Currencies.propTypes = {
  handleCurrencyChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
