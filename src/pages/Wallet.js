import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { addEmail } = this.props;
    return <div>{addEmail}</div>;
  }
}

const mapStateToProps = (state) => ({
  addEmail: state.user.email,
});

Wallet.propTypes = {
  password: PropTypes.func.isRequired,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
