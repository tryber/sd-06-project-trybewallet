import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    const totalValue = (total * 1).toFixed(2);

    return (
      <header>
        <span>Email: </span>
        <span data-testid="email-field">{email}</span>
        <br />
        <span>Despesa total: </span>
        <span data-testid="total-field" value="0">{ totalValue }</span>
        <span data-testid="header-currency-field"> BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
