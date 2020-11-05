import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currency } from '../actions';
import getAllCurrency from '../services/api';

class SelectMoeda extends React.Component {
  constructor() {
    super();

    this.state = {
      currencys: [],
    };
  }

  async componentDidMount() {
    const { currency } = this.props;
    const allCurrency = await getAllCurrency();
    const arrayAllCurrency = Object.values(allCurrency);
    arrayAllCurrency.splice(1, 1);
    const currencyNew = arrayAllCurrency.map((currency) => currency.code);
    this.setState({
      currencys: arrayAllCurrency.map((currency) => currency.code),
    });
    currency(currencyNew);
  }

  render() {
    const { currencys } = this.state;
    return(
      <label>
        Moeda :
        <select data-testid="currency-input" name="currency" onChange={ this.props.handleChange }>
          { currencys.map(currency => {
            return <option value={ currency } data-testid={ currency } key={ currency }>{ currency }</option>
          })
          }
        </select>
      </label> 
    );
  }
}

SelectMoeda.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currency: (currencies, expenses) => dispatch(currency(currencies, expenses))
})

export default connect(
  null, mapDispatchToProps
)(SelectMoeda);

