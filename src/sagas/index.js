import { put, takeLatest, all } from 'redux-saga/effects';
import Tasks from 'helpers/Tasks';

export function* getTasks() {
  const Request = new Tasks();
  const response = yield Request.getTasks();
  yield put({ type: 'TASKS_RECEIVED', tasks: response });
}

export function* actionWatcher() {
  yield takeLatest('GET_TASKS', getTasks);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
