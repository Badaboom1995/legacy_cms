import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/button.css';
import './styles/select.css';
import './styles/text-input.css';

const store = configureStore();
store.subscribe(() => {
  // const state = store.getState();
});

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root'),
);
