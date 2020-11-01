import React, { Component } from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <Form />
        <Table />
      </div>
    );
  }
}

export default Wallet;
