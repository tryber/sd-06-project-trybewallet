import React, { Component } from 'react';
import Forms from '../components/Forms';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends Component {
  render() {
    return (
      <section>
        <Header />
        <Forms />
        <Table />
      </section>
    );
  }
}

export default Wallet;
