import { put, takeLatest, all, select } from 'redux-saga/effects';
import Tasks from 'helpers/Tasks';
import Checks from 'helpers/Checks';

const getStore = state => state;

export function* getTasks() {
  const Request = new Tasks();
  const response = yield Request.getTasks();
  yield put({ type: 'TASKS_RECEIVED', tasks: response });
}

export function* getChecks() {
  const Request = new Checks();
  const response = yield Request.getChecks();
  yield put({ type: 'CHECKS_RECEIVED', checks: response });
}

export function* deleteChecks(action) {
  const Request = new Checks();
  yield Request.deleteCheck(action.id);
}

export function* addTask() {
  const store = yield select(getStore);
  const Request = new Checks();
  Request.createCheckJobs(
    store.checks.id,
    store.checks.tasks[store.checks.tasks.length - 1].task.id.toString(),
  );
  yield put({ type: 'TASK_ADDED' });
}

///////////////////////

function* actionWatcher() {
  yield takeLatest('GET_TASKS', getTasks);
}
function* getChecksWatcher() {
  yield takeLatest('GET_CHECKS', getChecks);
}
function* deleteCheckWatcher() {
  yield takeLatest('DELETE_CHECK', deleteChecks);
}
function* addTaskWatcher() {
  yield takeLatest('ADD_TASK_TO_TEST', addTask);
}

export default function* rootSaga() {
  yield all([actionWatcher(), addTaskWatcher(), getChecksWatcher(), deleteCheckWatcher()]);
}
