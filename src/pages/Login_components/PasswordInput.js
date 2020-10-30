import React from 'react';
import PropTypes from 'prop-types';

const MIN_PASSWORD_LENGTH = 6;

class PasswordInput extends React.Component {
  validatePassword(value) {
    return value.length >= MIN_PASSWORD_LENGTH;
  }

  render() {
    const { handleChange } = this.props;

    return (
      <div>
        <label htmlFor="password-input">
          Senha
          <input
            name="password-input"
            type="password"
            data-testid="password-input"
            onChange={ (e) => handleChange(e, 'password', this.validatePassword) }
          />
        </label>
      </div>
    );
  }
}
PasswordInput.defaultProps = { handleChange: () => {} };

PasswordInput.propTypes = {
  handleChange: PropTypes.func,
};

export default PasswordInput;
