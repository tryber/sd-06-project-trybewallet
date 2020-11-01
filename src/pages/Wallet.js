import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';
import PropTypes from 'prop-types';
import Forms from '../components/Forms';
import Header from '../components/Header';
import fetchApi from '../services';

class Wallet extends Component {
  async componentDidMount() {
    const { dispatchCurrency } = this.props;

    const fetchCurrencies = await fetchApi();
    const currenciesKeys = Object.keys(fetchCurrencies);
    const currencies = currenciesKeys.filter(currency => (currency !== 'USDT'));

    dispatchCurrency(currencies);
  }

  render() {
    return (
      <section>
        <Header />
        <Forms />
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrency: (expenses) => dispatch(getCurrencies(expenses)),
});

Wallet.propTypes = {
  dispatchCurrency: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
