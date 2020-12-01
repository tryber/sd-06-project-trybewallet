import React from 'react';
import Header from './Header';
import Form from './Form';
import Table from './Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
    };
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
export default Wallet;
