import { put, takeLatest, all, select } from 'redux-saga/effects';
import { SAVE_SELECTED_CHECK } from 'actions/checks';
import Tasks from 'helpers/Tasks';
import Checks from 'helpers/Checks';
import Structure from 'helpers/Structure';

const getStore = state => state;

function* getTasks(action) {
  const { params = {} } = action;
  console.log(action);
  const Request = new Tasks();
  const response = yield Request.getTasks(params);
  yield put({ type: 'TASKS_RECEIVED', tasks: response });

  if (!params.limit || params.limit > response.length) {
    yield put({ type: 'TASKS_RECEIVED_ALL' });
  }
}

function* getTasksPart(action = {}) {
  const { params = {} } = action;
  console.log(action)
  const Request = new Tasks();
  const response = yield Request.getTasks(params);
  yield put({ type: 'TASKS_PART_RECEIVED', tasks: response });

  if (!params.limit || params.limit > response.length) {
    yield put({ type: 'TASKS_RECEIVED_ALL' });
  }
}

function* getChecks(action) {
  const { params = {} } = action;
  const Request = new Checks();
  const response = yield Request.getChecks(params);
  yield put({ type: 'CHECKS_RECEIVED', checks: response });

  if (!params.limit || params.limit > response.length) {
    yield put({ type: 'CHECKS_RECEIVED_ALL' });
  }
}

function* getChecksPart(action = {}) {
  const { params = {} } = action;
  const Request = new Checks();
  const response = yield Request.getChecks(params);
  yield put({ type: 'CHECKS_PART_RECEIVED', checks: response });

  if (!params.limit || params.limit > response.length) {
    yield put({ type: 'CHECKS_RECEIVED_ALL' });
  }
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

function* getSubjects() {
  const Request = new Structure();
  const response = yield Request.getSubjects();
  yield put({ type: 'SUBJECTS_RECEIVED', response });
}
function* getLearningLevels() {
  const Request = new Structure();
  const response = yield Request.getLearningLevels();
  const grades = response.filter(item => {
    return item.id < 49 && item.id != 6;
  });
  yield put({ type: 'LEARNING_LEVELS_RECEIVED', grades });
}
function* getScales() {
  const Request = new Structure();
  const response = yield Request.getScales();
  const scales = response.filter(item => {
    return item.id < 3;
  });
  yield put({ type: 'SCALES_RECEIVED', scales });
}
function* getCheckModes() {
  const Request = new Structure();
  const response = yield Request.getCheckModes();
  const check_modes = response.filter(item => item.id < 3);
  yield put({ type: 'CHECK_MODES_RECEIVED', check_modes });
}
function* saveSelectedCheck(action) {
  const Request = new Checks();
  const response = yield Request.updateCheck(action.id, action.check);
  yield put({ type: 'SELECTED_CHECK_SAVED', response });
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

function* getTasksWatcher() {
  yield takeLatest('GET_TASKS', getTasks);
}
function* getTasksPartWatcher() {
  yield takeLatest('GET_TASKS_PART', getTasksPart);
}
function* getChecksWatcher() {
  yield takeLatest('GET_CHECKS', getChecks);
}
function* getChecksPartWatcher() {
  yield takeLatest('GET_CHECKS_PART', getChecksPart);
}
function* getChaptersWatcher() {
  yield takeLatest('GET_CHAPTERS', getChapters);
}
function* getTopicsWatcher() {
  yield takeLatest('GET_TOPICS', getTopics);
}
function* getSubjectsWatcher() {
  yield takeLatest('GET_TOPICS', getSubjects);
}
function* getLearningLevelsWatcher() {
  yield takeLatest('GET_LEARNING_LEVELS', getLearningLevels);
}
function* getScalesWatcher() {
  yield takeLatest('GET_SCALES', getScales);
}
function* getCheckModesWatcher() {
  yield takeLatest('GET_CHECK_MODES', getCheckModes);
}
function* saveSelectedCheckWatcher() {
  yield takeLatest(SAVE_SELECTED_CHECK, saveSelectedCheck);
}
function* deleteCheckWatcher() {
  yield takeLatest('DELETE_CHECK', deleteChecks);
}
function* addTaskWatcher() {
  yield takeLatest('ADD_TASK_TO_TEST', addTask);
}

export default function* rootSaga() {
  yield all([
    getTasksWatcher(),
    getTasksPartWatcher(),
    addTaskWatcher(),
    getChecksWatcher(),
    getChecksPartWatcher(),
    deleteCheckWatcher(),
    getChaptersWatcher(),
    getTopicsWatcher(),
    getSubjectsWatcher(),
    getLearningLevelsWatcher(),
    getScalesWatcher(),
    getCheckModesWatcher(),
    saveSelectedCheckWatcher(),
  ]);
}
