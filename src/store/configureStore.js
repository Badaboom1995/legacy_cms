// store creation
import { createStore, combineReducers } from 'redux';
import generalReducer from '../reducers/general';

export default () => {
  const store = createStore(
    combineReducers({
      general: generalReducer,
    }),
  );

  return store;
};
