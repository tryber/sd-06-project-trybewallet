import React from 'react';
import PropTypes from 'prop-types';

class EmailInput extends React.Component {
  render() {
    const { handleChange } = this.props;

    return (
      <div>
        <label htmlFor="email-input">
          Email:
          <input
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ (e) => handleChange(e, 'email', (value) => !!(value
              .match(/\S+@\S+\.\S+/))) }
          />
        </label>
      </div>
    );
  }
}

EmailInput.defaultProps = { handleChange: () => {} };

EmailInput.propTypes = {
  handleChange: PropTypes.func,
};

export default EmailInput;
