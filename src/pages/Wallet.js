import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    const expenses = 0;
    const curExchange = 'BRL';
    return (
      <div>
        TrybeWallet
        <p data-testid="email-field">{ `Seu email é: ${email}` }</p>
        <div>
          <p data-testid="total-field">{ `Despesa total: ${expenses}` }</p>
          <p data-testid="header-currency-field">{ curExchange }</p>
        </div>
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
