import * as types from './actionTypes';

const initialState = {
  fetchedJobs: undefined,
  activeJobs: undefined,
  inactiveJobs: undefined,
  newJobs: undefined,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.JOBS_FETCHED:
      return { ...state, fetchedJobs: action.fetchedJobs };
    case types.JOBS_CREATED:
      return { ...state, newJobs: action.newJobs };
    default:
      return state;
  }
}

export function getFetchedJobs(state) {
  return state.jobs.fetchedJobs;
}

export function getActiveJobs(state) {
  return state.jobs.fetchedJobs.filter(job => job.active);
}

export function getInactiveJobs(state) {
  return state.jobs.fetchedJobs.filter(job => !job.active);
}

export function getNewJobs(state) {
  return state.jobs.newJobs;
}
