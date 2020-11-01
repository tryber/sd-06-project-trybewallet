import React from 'react';
import PropTypes from 'prop-types';
import logoTrybe from '../../img/trybe-logo.png';

import './style.css';

// Usando Emoji no REACT
// [https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7]

class Header extends React.Component {
  render() {
    const { titulo } = this.props;
    return (
      <header className="header-contaier">
        <img src={ logoTrybe } alt="logo da Trybe" />
        <h1>
          <span role="img" aria-label="sacola de dinheiro">💰</span>
          {titulo}
          <span role="img" aria-label="caderninho de anotação">📔</span>
        </h1>
      </header>
    );
  }
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Header;
