import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { loginEmail, total } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{ loginEmail }</div>
          <div data-testid="total-field">{ total || 0}</div>
          <div data-testid="header-currency-field">BRL</div>
          <h1>TrybeWallet</h1>
        </header>
        <Form />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loginEmail: state.user.email,
  total: state.wallet.total,
});

Wallet.propTypes = {
  loginEmail: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Wallet);
