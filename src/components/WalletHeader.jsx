import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends Component {
  render() {
    const { userEmail, total } = this.props;
    const fixedTotal = parseFloat(total).toFixed(2);
    return (
      <header>
        <div data-testid="email-field">{ userEmail }</div>
        <span data-testid="total-field" value="0">{ fixedTotal }</span>
        <span data-testid="header-currency-field">BRL</span>
        <h1>Logado </h1>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  total: state.wallet.total,
});

WalletHeader.propTypes = {
  total: PropTypes.number.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
