import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import './styles/styles.scss';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2eb8f2' },
  },
});

const store = configureStore();
store.subscribe(() => {
  // const state = store.getState();
});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
