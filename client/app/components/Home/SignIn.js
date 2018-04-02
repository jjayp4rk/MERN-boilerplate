import React, { Component } from 'react';
import 'whatwg-fetch';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('app');
    if (obj && obj.token) {
      // verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            })
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({ signInEmail: event.target.value });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({ signInPassword: event.target.value });
  }

	onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword
    } = this.state;
    // Post request to backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('app', { token: json.token });
          this.setState({
            signInError: json.message, 
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        }
      });
  }
  componentDidMount() {
    const obj = getFromStorage('app');
    if (obj && obj.token) {
      // verify token
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            })
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }
  render() {
    const{
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
    } = this.state;
    if (isloading) {
      return (<div><p>Loading..</p></div>);
    }
    if (!token) {
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>SIGN IN</p>
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}
            />
            <br />
            <button onClick={this.onSignIn}> Sign In! </button>
          </div>
        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
      </div>
    );
  }
}

export default SignIn;
