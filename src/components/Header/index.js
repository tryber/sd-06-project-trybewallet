import React from 'react';
import logoTrybe from '../../img/trybe-logo.png';

class Header extends React.Component {
  render() {
    const { titulo } = this.props;
    return (
      <>
        <img src={ logoTrybe } alt="logo da Trybe" />
        <h1>
          💰
          {titulo}
          📔
        </h1>
      </>
    );
  }
}

export default Header;
