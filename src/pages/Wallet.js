import React from 'react';
import Form from '../components/Form';
import Header from '../components/Header';
import './wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>
    );
  }
}

export default Wallet;
