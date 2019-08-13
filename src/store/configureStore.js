// store creation
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import generalReducer from '../reducers/general';
import tasksReducer from '../reducers/tasks';
import { logger } from 'redux-logger';
import rootSaga from 'sagas';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    combineReducers({
      general: generalReducer,
      tasks: tasksReducer,
    }),
    applyMiddleware(sagaMiddleware, logger),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
