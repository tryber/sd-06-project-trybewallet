import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrybeLogo from '../img/trybe-logo.png'
import Despesas from '../components/Despesas'

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: 'BRL',
      expenses: '0',
    };
  }

  render() {
    const { user } = this.props;
    const { currency, expenses } = this.state;
    return (
      <div className="wallet-container">
        <header>
          <div className="wallet-image-div">
            <img src={TrybeLogo} width="150" />
          </div>
          <div className="wallet-info-div">
            <p data-testid="email-field">
              Email:
              {user}
            </p>
            <p data-testid="total-field">
              Despesa Total:
              {expenses}
              <span data-testid="header-currency-field">{currency}</span>
            </p>
          </div>
        </header>
        <Despesas />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = { user: PropTypes.string.isRequired };

export default connect(mapStateToProps)(Wallet);
