import React, { Component } from 'react';
import request from 'services/request';

const Auth = props => WrappedComponent => {
  return class AuthHOC extends Component {
    state = {
      isAuth: false,
    };

    componentDidMount() {
      const req = new request();
      if (req.getChecks()) {
        this.setState(() => ({
          isAuth: true,
        }));
      }
    }

    render() {
      return this.state.isAuth ? <WrappedComponent /> : <div>Loading...</div>;
    }
  };
};

export default Auth;
