import React from 'react';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: [],
      currency: '',
    };
  }

  render() {
    return (
      <div>
        Wallet
      </div>
    );
  }
}
export default Wallet;
