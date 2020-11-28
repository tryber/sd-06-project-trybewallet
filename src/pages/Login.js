import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { green } from '@material-ui/core/colors';

const ColorButton = withStyles(() => ({
  root: {
    color: '#ffff',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);

export class Login extends Component {
  render() {
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <div className="mt-3 mt-md-5">
            <div className="text-center">
              <img src="trybe.png" alt="img" width="250" />
              <Typography
                className="mt-3 font-weight-normal"
                component="h1"
                variant="h6"
              />
            </div>
          </div>
          <div className="mt-4">
            <TextField
              data-testid="email-input"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="username"
              type="email"
            />
            <TextField
              data-testid="password-input"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Senha"
              name="password"
              type="password"
            />

            <Button
              type="button"
              variant="contained"
              fullWidth
              color="default"
              size="large"
              className="mb-3 mb-md-2 mt-4"
            >
              Entrar
            </Button>
            <Link to="/register">
              <ColorButton
                type="button"
                fullWidth
                size="large"
                variant="contained"
                className="mt-md-4"
              >
                Cadastrar
              </ColorButton>
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
