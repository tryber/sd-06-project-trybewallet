import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <header>
        <div>
          <span>Email: </span>
          <span data-testid="email-field">{email}</span>
        </div>
        <div>
          <span>Total despesas: </span>
          <span data-testid="total-field" value="0">{total}</span>
          <span data-testid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: propTypes.string.isRequired,
  total: propTypes.number.isRequired,
};
