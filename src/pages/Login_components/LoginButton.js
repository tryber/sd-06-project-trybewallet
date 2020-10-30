import React from 'react';
import PropTypes from 'prop-types';

class LoginButton extends React.Component {
  render() {
    const { disabled, onClick } = this.props;

    return (
      <button
        type="button"
        disabled={ disabled }
        onClick={ onClick }
      >
        Entrar
      </button>
    );
  }
}

LoginButton.defaultProps = {
  disabled: false,
  onClick: () => {},
};

LoginButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default LoginButton;
