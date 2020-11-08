import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <span data-testid="email-field">
          {`the email goes here: ${email}`}
        </span>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    email: state.email,
  };
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
