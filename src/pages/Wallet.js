import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    const { user: email } = this.props;

    this.state = {
      email,
    };
  }

  render() {
    const { email } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <h2>{ email }</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
