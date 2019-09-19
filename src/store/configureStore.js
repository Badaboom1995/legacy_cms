// store creation
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import generalReducer from '../reducers/general';
import tasksReducer from '../reducers/tasks';
import checksReducer from '../reducers/checks';
import imagesReducer from '../reducers/images';
import { logger } from 'redux-logger';
import rootSaga from 'sagas';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const store = createStore(
    combineReducers({
      general: generalReducer,
      tasks: tasksReducer,
      checks: checksReducer,
      images: imagesReducer,
    }),
    applyMiddleware(sagaMiddleware, logger, thunk),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
