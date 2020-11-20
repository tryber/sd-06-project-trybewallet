import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from './components/form';
// import { currencyThunk } from '../actions';

class Wallet extends React.Component {
  // componentDidMount() {
  //   const { getCurrency } = this.props;
  //   getCurrency();
  // }

  render() {
    const { email, total } = this.props;
    return (
      <div>
        TrybeWallet
        <span data-testid="email-field">{email}</span>
        <span data-testid="header-currency-field">Total em BRL </span>
        <span data-testid="total-field">
          { total || 0 }
        </span>
        <Form />
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  email: store.user.email,
  total: store.wallet.total,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(
  mapStateToProps,
)(Wallet);
