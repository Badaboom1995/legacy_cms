// store creation
import { createStore, combineReducers } from 'redux';
import generalReducer from '../reducers/general';
import tasksReducer from '../reducers/tasks';

export default () => {
  const store = createStore(
    combineReducers({
      general: generalReducer,
      tasks: tasksReducer,
    }),
  );

  return store;
};
