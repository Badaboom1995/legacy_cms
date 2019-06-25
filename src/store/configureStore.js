// store creation
import { createStore, combineReducers } from "redux";
import generalReducer from "../reducers/general";

export default () => {
  const store = createStore(
    combineReducers({
      general: generalReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
