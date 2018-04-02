import React, { Component } from 'react';
import 'whatwg-fetch';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signUpError: '',
      signUpEmail: '',
      signUpFirstName: '',
      signUpPassword: '',
      signUpLastName: '',
    };

    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }
  onSignUp() {
  // Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;
      // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    }).then(res => res.json())
      .then(json => {
	      if (json.success) {
	        this.setState({
	          signUpError: json.message,
	          signUpEmail: '',
	          signUpPassword: '',
	          signUpFirstName: '',
	          signUpLastName: '',
	        });
	      } else {
	        this.setState({
	          signUpError: json.message,
	      });
	    }
	  });
}
  render() {
    const {
      token,
      signUpEmail,
      signUpPassword,
      signUpFirstName,
      signUpLastName,
      signUpError,
    } = this.state;

    if (!token) {
      return (
        <div>
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>SIGN UP</p>
            <input
              type="firstName"
              placeholder="First Name"
              value={signUpFirstName}
              onChange={this.onTextboxChangeSignUpFirstName}
            />
            <br />
            <input
              type="lastName"
              placeholder="Last Name"
              value={signUpLastName}
              onChange={this.onTextboxChangeSignUpLastName}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={this.onTextboxChangeSignUpPassword}
            />
            <br />
            <button onClick={this.onSignUp}> Sign Up! </button>
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

export default SignUp;
