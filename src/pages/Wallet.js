import React, { Component } from 'react';
import Header from '../components/Header';
import { fetchingCurrenciesThunk } from '../actions';
import { connect } from 'react-redux';
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
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadCurrency: () => dispatch(fetchingCurrenciesThunk())
});

export default connect(null, mapDispatchToProps)(Wallet);
