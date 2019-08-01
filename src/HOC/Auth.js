import React, { Component } from 'react';

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
