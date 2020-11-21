import React from 'react';
import Header from '../components/header';
import Forms from '../components/forms';
import Table from '../components/table';

export default class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Forms />
        <Table />
      </div>
    );
  }
}
