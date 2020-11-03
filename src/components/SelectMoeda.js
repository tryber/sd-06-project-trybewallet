import React from 'react';
import { connect } from 'react-redux';
import { currency } from '../actions'
import * as api from '../services/api';

class SelectMoeda extends React.Component {
  constructor() {
    super();

    this.state = {
      currencys: [],
    }
  }

  async componentDidMount() {
    const allCurrency = await api.getAllCurrency();
    const arrayAllCurrency = Object.values(allCurrency);
    arrayAllCurrency.splice(1,1);
    console.log(allCurrency);
    console.log(arrayAllCurrency);
    const currency = arrayAllCurrency.map(currency => currency.code);
    this.setState({
      currencys: arrayAllCurrency.map(currency => currency.code),
    })
    this.props.currency(currency);
  }

  render() {
    const { currencys } = this.state;
    return(
      <label>Moeda :
        <select data-testid="currency-input" onChange={ this.props.metodoMoeda }>
          { currencys.map(currency => {
            return <option value={currency} data-testid={currency} key={currency}>{currency}</option>
          })
          }
        </select>
      </label> 
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currency: (currencies, expenses) => dispatch(currency(currencies, expenses))
})

export default connect(
  null, mapDispatchToProps
)(SelectMoeda);

