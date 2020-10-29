import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Button = ({ children, ...rest }) => (
  <button className="custom-button" type="button" { ...rest }>
    {children}
  </button>
);

export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
