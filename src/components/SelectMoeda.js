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
    this.startFunction = this.startFunction.bind(this);
  }

  async componentDidMount() {
    this.startFunction();
  }

  async startFunction() {
    const { currencyP } = this.props;
    const allCurrency = await getAllCurrency();
    const arrayAllCurrency = Object.values(allCurrency);
    arrayAllCurrency.splice(1, 1);
    const currencyNew = arrayAllCurrency.map((currencyElem) => currencyElem.code);
    this.setState({
      currencys: arrayAllCurrency.map((currencyW) => currencyW.code),
    });
    currencyP(currencyNew);
  }

  render() {
    const { handleChange } = this.props;
    const { currencys } = this.state;
    return (
      <label htmlFor="select-moeda">
        Moeda :
        <select
          id="select-moeda"
          data-testid="currency-input"
          name="currency"
          onChange={ handleChange }
        >
          { currencys.map((currencyZ) => {
            const opt = (<option
              value={ currencyZ }
              data-testid={ currencyZ }
              key={ currencyZ }
            >
              { currencyZ }
            </option>);
            return opt;
          })}
        </select>
      </label>
    );
  }
}

SelectMoeda.propTypes = {
  handleChange: PropTypes.func.isRequired,
  currencyP: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currencyP: (currencies, expenses) => dispatch(currency(currencies, expenses)),
});

export default connect(
  null, mapDispatchToProps,
)(SelectMoeda);
