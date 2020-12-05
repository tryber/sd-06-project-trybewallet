import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';
import Header from '../components/header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        WALLET
        <Header />
        <Form />
        <Table />
      </div>
    );
  }
}

export default connect(null, null)(Wallet);
