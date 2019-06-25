import ReactDOM from "react-dom";
import React from "react";
import AppRouter from "./routers/AppRouter.js";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();
store.subscribe(() => {
  const state = store.getState();
});

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("root")
);
