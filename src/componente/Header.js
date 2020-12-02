import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <div>
        <p data-testid="email-field">
          Email:
          {email}
          .
        </p>
        <p data-testid="total-field">Dispesa total: 0</p>
        <p data-testid="header-currency-field">cambio: BRL</p>
      </div>
    );
  }
}

const mapStateToPro = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.object,
}.isRequired;

export default connect(mapStateToPro)(Header);
