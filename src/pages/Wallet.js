import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Wallet.css';
import logo from './logo.png';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    const value = 0;
    return (
      <div>
        <header className="header">
          <img src={ logo } height="25px" alt="logomarca" />
          <p>
            Usuário:
            <span data-testid="email-field">{ email }</span>
          </p>
          <p>
            Despesa Total: R$
            <span data-testid="total-field">{ value }</span>
            ,00
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
