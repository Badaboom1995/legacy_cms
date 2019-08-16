import { put, takeLatest, all, select } from 'redux-saga/effects';
import Tasks from 'helpers/Tasks';
import Checks from 'helpers/Checks';

const getStore = state => state;

export function* getTasks() {
  const Request = new Tasks();
  const response = yield Request.getTasks();
  yield put({ type: 'TASKS_RECEIVED', tasks: response });
}

export function* addTask() {
  const store = yield select(getStore);
  console.log(store);
  console.log(store.checks.tasks[store.checks.tasks.length - 1].task.id);

  const Request = new Checks();
  Request.createCheckJobs(
    store.checks.id,
    store.checks.tasks[store.checks.tasks.length - 1].task.id.toString(),
  );

  yield put({ type: 'TASK_ADDED' });
}

export function* actionWatcher() {
  yield takeLatest('GET_TASKS', getTasks);
}

export function* addTaskWatcher() {
  yield takeLatest('ADD_TASK_TO_TEST', addTask);
}

export default function* rootSaga() {
  yield all([actionWatcher(), addTaskWatcher()]);
}
