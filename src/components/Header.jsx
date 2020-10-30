import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, userExpenses } = this.props;

    return (
      <header>
        <span data-testid="email-field">
          User:
          { userEmail }
        </span>
        <span data-testid="total-field">
          Total Spends:
          { userExpenses.length > 0 ? userExpenses.length : 0 }  
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.any).isRequired, 
};

export default connect(mapStateToProps)(Header);