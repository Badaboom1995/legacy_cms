import { put, takeLatest, all, select } from 'redux-saga/effects';
import Tasks from 'helpers/Tasks';
import Checks from 'helpers/Checks';
import Structure from 'helpers/Structure';

const getStore = state => state;

function* getTasks() {
  const Request = new Tasks();
  const response = yield Request.getTasks();
  yield put({ type: 'TASKS_RECEIVED', tasks: response });
}

function* getChecks() {
  const Request = new Checks();
  const response = yield Request.getChecks();
  yield put({ type: 'CHECKS_RECEIVED', checks: response });
}

function* getChapters() {
  const Request = new Structure();
  const response = yield Request.getChapters();
  const chaptersNames = response.map(item => item.name);
  yield put({ type: 'CHAPTERS_RECEIVED', response, chaptersNames });
}

function* getTopics() {
  const Request = new Structure();
  const response = yield Request.getTopics();
  const topicsNames = response.map(item => item.name);
  yield put({ type: 'TOPICS_RECEIVED', response, topicsNames });
}

function* deleteChecks(action) {
  const Request = new Checks();
  yield Request.deleteCheck(action.id);
}

function* addTask() {
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
function* getChaptersWatcher() {
  yield takeLatest('GET_CHAPTERS', getChapters);
}
function* getTopicsWatcher() {
  yield takeLatest('GET_TOPICS', getTopics);
}
function* deleteCheckWatcher() {
  yield takeLatest('DELETE_CHECK', deleteChecks);
}
function* addTaskWatcher() {
  yield takeLatest('ADD_TASK_TO_TEST', addTask);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
    addTaskWatcher(),
    getChecksWatcher(),
    deleteCheckWatcher(),
    getChaptersWatcher(),
    getTopicsWatcher(),
  ]);
}
