import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { emailLogin,
      // expenses
    } = this.props;
    return (
      <header>
        <span data-testid="email-field">{ emailLogin }</span>
        <span data-testid="total-field">
          Despesa Total
          {/* Um campo com a despesa total gerada pela lista de gastos.
          Inicialmente esse campo deve exibir o valor 0 */}
        </span>
        <span data-testid="header-currency-field">
          {/* Um campo que mostre qual câmbio está sendo utilizado,
          que será neste caso será 'BRL'. */}
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailLogin: state.user.email,
});

Header.propTypes = {
  emailLogin: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
