import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../imgs/trybe.png';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <img src={ logo } alt="Logo Trybe" />
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">Despesa Total: R$ 0,00</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
