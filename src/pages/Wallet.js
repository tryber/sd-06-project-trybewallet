import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

  class Wallet extends Component {
    render() {
      const { userEmail } = this.props;
      return (
        <div>
          <header>
            <div data-testid="email-field">{userEmail}</div>
          </header>
          <h1>TrybeWallet</h1>
          <section>
            <span data-testid="total-field">0</span>
            <span data-testid="header-currency-field">BRL</span>
          </section>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    userEmail: state.user.email,
  });
  
  Wallet.propTypes = {
    userEmail: PropTypes.string.isRequired,
  };
  
  export default connect(mapStateToProps)(Wallet);
