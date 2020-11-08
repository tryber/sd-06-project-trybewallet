import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalExpenses: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { totalExpenses, currency } = this.state;
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          {totalExpenses}
        </span>
        <span data-testid="header-currency-field">
          {currency}
        </span>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    email: state.user.email,
  };
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
