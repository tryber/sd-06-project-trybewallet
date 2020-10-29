import React from 'react';

class EmailInput extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="email-input">
          Email:
          <input
            name="email"
            type="email"
            data-testid="email-input"
            // onChange={ handleEmailChange }
          />
        </label>
      </div>
    );
  }
}

export default EmailInput;
