import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    }

  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <nav className="user-info">
          <p>
            User: 
            <span data-testid="email-field">{ email }</span>
          </p>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({

})

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
