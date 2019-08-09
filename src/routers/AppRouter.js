import React from 'react';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from '../pages/Home/Home';
import CreateTest from 'pages/CreateTest/CreateTest';
import NotFoundPage from '../pages/NotFoundPage';
import Auth from '../HOC/Auth';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div className="dashboard">
      <nav className="main-nav">
        <NavLink exact activeClassName="main-nav__link--active" className="main-nav__link" to="/">
          Задания
        </NavLink>
        <NavLink activeClassName="main-nav__link--active" className="main-nav__link" to="/tests">
          Тесты
        </NavLink>
        {/* <NavLink 
        activeClassName="main-nav__link--active" className="main-nav__link" to="/tests">
          Список тестов
        </NavLink> */}
      </nav>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/tests" component={CreateTest} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default Auth()(AppRouter);
