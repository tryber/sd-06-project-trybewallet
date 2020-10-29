import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { userEmail } = this.props;
    return (
      <header>
        <nav>
          <Link to="/">logout para o home</Link>
          <section data-testid="email-field">{ userEmail }</section>
          <section data-testid="total-field">despesa total vem aqui</section>
          <section data-testid="header-currency-field">cambio BRL</section>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps, null)(Header);
