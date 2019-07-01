import React, { Component } from 'react';
import Request from 'helpers/request';

const Auth = () => WrappedComponent => {
  return class AuthHOC extends Component {
    state = {
      isAuth: false,
    };

    componentDidMount() {
      const Req = new Request();
      if (Req.getChecks()) {
        this.setState(() => ({
          isAuth: true,
        }));
      }
    }

    render() {
      const { isAuth } = this.state;
      return isAuth ? <WrappedComponent /> : <div>Loading...</div>;
    }
  };
};

export default Auth;
