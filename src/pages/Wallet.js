import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateExchangeInfo } from '../actions';

import Header from './Wallet_components/Header';
import FormularioDespesa from './Wallet_components/FormularioDespesa';
import fetchApi from '../services/api';

class Wallet extends React.Component {
  componentDidMount() {
    const { updateExchangeInfo } = this.props;
    fetchApi().then((exchangeRates) => updateExchangeInfo(exchangeRates));
  }

  render() {
    return (
      <div>
        <div>TrybeWallet</div>
        <Header />
        <FormularioDespesa />
      </div>
    );
  }
}

Wallet.defaultProps = {
  updateExchangeInfo: () => {},
};

Wallet.propTypes = {
  updateExchangeInfo: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  updateExchangeInfo: (exchangeInfo) => dispatch(updateExchangeInfo(exchangeInfo)),
});

export default connect(null, mapDispatchToProps)(Wallet);
