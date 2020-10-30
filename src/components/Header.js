import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail } = this.props;

    return (
      <div>
        <div data-testid="email-field">
          <label>
            Email:
            { userEmail }
          </label>
        </div>
        <div data-testid="total-field">
          <label>
            <p>Despesa Total: R$</p>
            {0}
          </label>
          <label data-testid="header-currency-field">BRL</label>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
};

const mapStateToPros = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToPros)(Header);
