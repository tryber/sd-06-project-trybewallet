import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Header = (props) => {
  const { userEmail, total } = props;
  return (
    <div>
      <p data-testid="email-field">{userEmail}</p>
      <p data-testid="total-field">{ total }</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
};

Header.propTypes = {
  userEmail: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  total: state.wallet.totalMoneySpent,
});

export default connect(mapStateToProps)(Header);
