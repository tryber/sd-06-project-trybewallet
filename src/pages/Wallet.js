import React from 'react';
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
      </div>
    );
  }
}

export default Wallet;
