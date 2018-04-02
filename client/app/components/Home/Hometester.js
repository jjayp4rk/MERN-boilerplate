import React, { Component } from 'react';
import 'whatwg-fetch';

import SignUp from './SignUp';
import SignIn from './SignIn';


class Home extends Component {
  render() {
    return (
      <div>
        <SignUp/>
      </div>
    );
  }
}

export default Home;
