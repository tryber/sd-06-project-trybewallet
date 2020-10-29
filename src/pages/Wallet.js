import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-container">
        <header>
          <div className="wallet-image-div">
            <p>Imagem da Trybe</p>
          </div>
          <div className="wallet-info-div">
            <p>Email: bla@bla.com</p>
            <p> Despesa Total: -R$5.000.000</p>
          </div>
        </header>
      </div>
    )
  }
}

export default Wallet
