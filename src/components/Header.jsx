import React from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
  const { userEmail } = props;
  return (
    <div>
      <p data-testid="email-field">{userEmail}</p>
      <p data-testid="total-field">0</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}
const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps)(Header);
