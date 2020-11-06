import React from 'react';
import PropTypes from 'prop-types';
//import logoTrybe from '../../img/trybe-logo.png';

class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <header className="header-contaier">
        {/*<img src={ logoTrybe } alt="logo da Trybe" />*/}
        <h1>
          <span role="img" aria-label="sacola de dinheiro">💰</span>
          {title}
          <span role="img" aria-label="caderninho de anotação">📔</span>
        </h1>
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
