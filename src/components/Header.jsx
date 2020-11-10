import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './CSS/HeaderCSS.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    console.log(email);
    return (
      <div className="header-container">
        <p data-testid="email-field">
          {` ${email} `}
        </p>
        <p data-testid="total-field" value="0">
          {total}
          {/* 0 */}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
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

export default connect(
  mapStateToProps,
)(Header);
