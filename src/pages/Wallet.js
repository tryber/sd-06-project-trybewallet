import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <header>
          <div data-testid="email-field">
            <h5>{ email }</h5>
          </div>
          <div data-testid="total-field">
            <h5>Despesas: 0</h5>
          </div>
          <div data-testid="header-currency-field">
            <h5>Câmbio Utilizado: BRL</h5>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  password: PropTypes.func.isRequired,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
