import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    // Cria o estado aqui antes de mandar para store para que só envie
    //  com tudo preenchido e não sujar a store em caso de desistência do
    //   USER no meio do caminho.
    this.state = {
      // email: '',
      // password: '',
    };
  }

  render() {
    // const { email, password } = this.state;
    // const { props } = this.props;
    return (
      <div>
        <div>
          <input
            type="text"
            data-testid="email-input"
            // onChange={ (event) => this.setState({ email: event.target.value }) }
            placeholder="email"
          />
          <input
            type="password"
            data-testid="password-input"
            // onChange={ (event) => this.setState({ password: event.target.value }) }
            placeholder="senha"
          />
          <button
            type="button"
            // onClick={ () => props.setForms(this.state) }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
