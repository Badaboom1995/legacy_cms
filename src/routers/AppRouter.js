import React, { useEffect } from 'react';
import { Router, Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import Home from '../pages/Home/Home';
import CreateTest from 'pages/CreateTest/CreateTest';
import TestsList from 'pages/TestsList/TestsList';
import NotFoundPage from '../pages/NotFoundPage';
import { getChapters, getTopics, getSubjects, getLearningLevels } from 'actions/general';
// import Auth from '../HOC/Auth';

export const history = createBrowserHistory();

const AppRouter = props => {
  useEffect(() => {
    Promise.all([
      props.dispatch(getChapters()),
      props.dispatch(getTopics()),
      props.dispatch(getSubjects()),
      props.dispatch(getLearningLevels()),
    ]);
  });
  return (
    <Router history={history}>
      <div className="dashboard">
        <nav className="main-nav">
          <NavLink
            exact
            activeClassName="main-nav__link--active"
            className="main-nav__link"
            to="/b2t/constructor/"
          >
            Задания
          </NavLink>
          <NavLink
            activeClassName="main-nav__link--active"
            className="main-nav__link"
            to="/b2t/constructor/tests"
          >
            Тесты
          </NavLink>
          <NavLink
            activeClassName="main-nav__link--active"
            className="main-nav__link"
            to="/b2t/constructor/tests_list"
          >
            Список тестов
          </NavLink>
        </nav>
        <Switch>
          <Route path="/b2t/constructor/" component={Home} exact />
          <Route path="/b2t/constructor/tests" component={CreateTest} />
          <Route path="/b2t/constructor/tests_list" component={TestsList} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect()(AppRouter);
