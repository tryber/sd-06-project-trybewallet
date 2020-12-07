import { connect } from 'react-redux';
import React from 'react';
import Form from './Form';
import Header from './header';
import Table from './Table';

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
