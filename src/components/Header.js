import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="header-container">
        <header>
          <p data-testid="email-field">{user}</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Header.propTypes = {
  user: propTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
