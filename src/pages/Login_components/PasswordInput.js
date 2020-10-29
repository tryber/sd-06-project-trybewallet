import React from 'react';

class PasswordInput extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="password-input">
          Senha
          <input
            name="password-input"
            value={ password }
            type="password"
            data-testid="password-input"
            // onChange={ handleEmailChange }
          />
        </label>
      </div>
    );
  }
}

export default PasswordInput;
