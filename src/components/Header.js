import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import trybeLogo from '../images/trybeLogo.png';

class Header extends React.Component {
  render() {
    const { userLogin, totalExpenses } = this.props;
    return (
      <header>
        <img src={ trybeLogo } alt="trybe-logo" />
        <div className="email-field">
          Email:
          <span data-testid="email-field">
            { userLogin }
          </span>
        </div>
        <div>
          Despesa Total:
          <span
            data-testid="total-field"
            value="0"
          >
            { totalExpenses }
          </span>
        </div>
        <div className="currency-field">
          <span data-testid="header-currency-field">
            BRL
          </span>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    userLogin: state.user.email,
    totalExpenses: state.wallet.total,
  };
}

Header.propTypes = {
  userLogin: PropTypes.string.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
