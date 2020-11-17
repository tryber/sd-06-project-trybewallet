import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './components/form';

class Wallet extends React.Component {
  render() {
    const { email, currency, expense } = this.props;
    return (
      <div>
        <Form />
        TrybeWallet
        <div data-testid="email-field">{email}</div>
        <div data-testid="total-field" value="0">{expense}</div>
        <div data-testid="header-currency-field">{currency}</div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  currency: store.wallet.currencies,
  expense: store.wallet.expenses,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currency: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expense: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
};

export default connect(mapStateToProps)(Wallet);
