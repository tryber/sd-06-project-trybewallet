import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiOk } from '../../actions';

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
    const currenciesResponse = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    const currencies = Object.values(currenciesResponse);
    const FILTERED_CURRENCIES = currencies.filter(
      (currency) => currency.name !== 'Dólar Turismo',
    );
    console.log(FILTERED_CURRENCIES);
    this.setState({ currencies: FILTERED_CURRENCIES });
  }

  handleChange({ target: { value } }) {
    const { handleChangeCurrency } = this.props;
    this.setState({ currency: value }, () => {
      const { currency } = this.state;
      handleChangeCurrency(currency);
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
          name="currencies"
          onChange={ (event) => handleChange(event) }
        >
          {currencies.map((currency) => (
            <option
              data-testid={ currency.code }
              key={ currency.name }
              value={ currency.code }
              name={ currency.name }
            >
              { currency.code }
            </option>
          ))}
        </select>
      </label>
    );
  }
}

const mapDispatchToProps = (disp) => ({
  addCoin: () => disp(apiOk(this.state)),
});

const mapStateToProps = (state) => ({ currencies: state.wallet.currencies });

Currencies.propTypes = {
  handleChangeCurrency: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
