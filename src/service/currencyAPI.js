import React from 'react';
import PropTypes from 'prop-types';

class CurrencySearcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
    };
  }
  // https://economia.awesomeapi.com.br/json/all
  // https://www.dnd5eapi.co/api/classes

  // https://economia.awesomeapi.com.br/json/all
  componentDidMount() {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        const currencyTypes = Object.keys(data)
          .filter((currency) => currency !== 'USDT');
        this.setState({
          currencies: currencyTypes,
        });
      });
  }

  render() {
    const { onChange, value, name } = this.props;
    const { currencies } = this.state;
    const optionItems = currencies
      .map((currency) => (
        <option
          data-testid={ currency }
          key={ currency }
        >
          {currency }
        </option>
      ));

    return (
      <div>
        <select
          name={ name }
          onChange={ onChange }
          value={ value }
          data-testid="currency-input"
        >
          {optionItems}
        </select>
      </div>
    );
  }
}

CurrencySearcher.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default CurrencySearcher;
// https://economia.awesomeapi.com.br/json/all
