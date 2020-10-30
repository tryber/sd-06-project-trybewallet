import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{user}</p>
          <p data-testid="total-field">Despesas:</p>
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
