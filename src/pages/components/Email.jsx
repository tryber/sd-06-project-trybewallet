import React from 'react';

const EmailLogin = () => (
  <label htmlFor="User-mail">
    Email:
    <input
      name="email"
      id="login-email"
      data-testid="email-input"
      type="text"
      pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
      required
    />
  </label>

);

export default EmailLogin;
