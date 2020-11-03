import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateExchangeInfo } from '../actions';

import Header from './Wallet_components/Header';
import FormularioDespesa from './Wallet_components/FormularioDespesa';
import fetchApi from '../services/api';
import Table from './Wallet_components/Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { updateExchangeInfo0 } = this.props;
    fetchApi().then((exchangeRates) => updateExchangeInfo0(exchangeRates));
  }

  render() {
    return (
      <div>
        <div>TrybeWallet</div>
        <Header />
        <FormularioDespesa />
        <Table />
      </div>
    );
  }
}

Wallet.defaultProps = {
  updateExchangeInfo0: () => {},
};

Wallet.propTypes = {
  updateExchangeInfo0: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  updateExchangeInfo0: (exchangeInfo) => dispatch(updateExchangeInfo(exchangeInfo)),
});

export default connect(null, mapDispatchToProps)(Wallet);
