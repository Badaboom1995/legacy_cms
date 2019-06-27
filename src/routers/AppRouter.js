import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../components/Home/Home';
import NotFoundPage from '../pages/NotFoundPage';
import Auth from '../HOC/Auth';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="dashboard">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default Auth()(AppRouter);
