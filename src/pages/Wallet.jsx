import React from 'react';
import Header from '../components/Header.jsx'

class Wallet extends React.Component {
  render() {
    return (
      <div className="header">
        <Header email="alguem@email.com" total={0} /> 
      </div>
    );
  };
}

export default Wallet;
