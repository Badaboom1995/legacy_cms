import React, { Component } from 'react';
import { compose } from 'react-redux';

const Auth = () => WrappedComponent => {
  return class AuthHOC extends Component {
    state = {
      isAuth: true,
    };

    componentDidMount() {}

    render() {
      const { isAuth } = this.state;
      return isAuth ? <WrappedComponent /> : <div>Loading...</div>;
    }
  };
};

export default Auth;
