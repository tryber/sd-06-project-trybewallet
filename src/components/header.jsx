import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    const cash = 0;
    console.log(this.props);
    return (
      <header>
        <div>
          <h3 data-testid="email-field">
            Email:
            { email }
          </h3>
          <h3 data-testid="total-field">
            Despesas totais:
            { cash }
          </h3>
          <h3 data-testid="header-currency-field">
            BRL
          </h3>
        </div>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(
  mapStateToProps,
)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
};
