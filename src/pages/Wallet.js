import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import Header from '../components/Header';
import './wallet.css';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <Header />
      </header>
    );
  }
}

export default Wallet;
