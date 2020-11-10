import React from 'react';
import Header from './Header';
import Form from './Form';

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
      </div>
    );
  }
}
export default Wallet;
