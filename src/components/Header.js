import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div>
          <h1 data-testid="email-field">
            Email :
            { email }
          </h1>
          <h1 data-testid="total-field">
            Despesas totais: 0
          </h1>
          <h1 data-testid="header-currency-field">
            BRL
          </h1>
        </div>
      </header>);
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
