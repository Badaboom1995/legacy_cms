import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../pages/Home/Home';
import CreateTest from 'pages/CreateTest/CreateTest';
import NotFoundPage from '../pages/NotFoundPage';
import Auth from '../HOC/Auth';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Link to="/">Create task</Link>
    <span> </span>
    <Link to="/tests">Create test</Link>
    <div className="dashboard">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/tests" component={CreateTest} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default Auth()(AppRouter);
