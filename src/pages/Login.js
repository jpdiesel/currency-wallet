import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmailAction } from '../actions';
import '../styles/Login.css'

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passLength = 6;

// esse REGEX foi feito com a ajuda do meu amigo Bernardo Prado da turma 11 e também com a ajuda do link a seguir:
// https://stackabuse.com/validate-email-addresses-with-regular-expressions-in-javascript/

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChanger = this.handleChanger.bind(this);
    this.enableSubmitBttn = this.enableSubmitBttn.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  enableSubmitBttn = () => {
    const { password, email } = this.state;
    if (EMAIL_REGEX.test(email) && password.length >= passLength) {
      return false;
    } return true;
  }

  onSubmit = () => {
    const { email } = this.state;
    const { emailDispatch, history } = this.props;
    emailDispatch(email);
    history.push('/carteira');
  }

  handleChanger({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { password, email } = this.state;
    return (
      <section className="login-form">
        <label className='email' htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            data-testid="email-input"
            onChange={ this.handleChanger }
            name="email"
            value={ email }
          />
        </label>
        <label className='password' htmlFor="password">
          Senha
          <input
            id="password"
            type="password"
            data-testid="password-input"
            onChange={ this.handleChanger }
            name="password"
            value={ password }
          />
        </label>
        <button
          className='login-button'
          type="button"
          disabled={ this.enableSubmitBttn() }
          onClick={ this.onSubmit }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (email) => dispatch(saveEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  emailDispatch: propTypes.func,
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;
