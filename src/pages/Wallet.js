import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { fetchingCurrenciesThunk } from '../actions';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends Component {
  componentDidMount() {
    const { loadCurrency } = this.props;
    loadCurrency();
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadCurrency: () => dispatch(fetchingCurrenciesThunk()),
});

Wallet.propTypes = {
  loadCurrency: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
