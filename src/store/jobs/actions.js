import * as types from './actionTypes';
import JobService from '../../helpers/jobs';

export function fetchCheckJobs(checkId) {
  return async dispatch => {
    try {
      const fetchedJobs = await JobService.getCheckJobs(checkId);
      dispatch({ type: types.JOBS_FETCHED, fetchedJobs });
    } catch (error) {
      console.error(error);
    }
  };
}

export function toggleActive(jobId) {
  return async (dispatch, getState) => {
    try {
      const {
        jobs: { fetchedJobs },
      } = getState();
      const updateFetchedJobs = fetchedJobs.map(job => {
        if (job.id === jobId) {
          const { active } = job;
          job.active = !active;
        }
        return job;
      });
      dispatch({ type: types.JOBS_FETCHED, fetchedJobs: updateFetchedJobs });
    } catch (error) {
      console.error(error);
    }
  };
}

export function createCheckJobs() {
  return async (dispatch, getState) => {
    try {
      const newJobs = [];
      if (getState().checks.newCheck) {
        const {
          checks: {
            newCheck: { id },
          },
        } = getState();
        const {
          jobs: { fetchedJobs },
        } = getState();
        const activeJobs = fetchedJobs.filter(job => job.active);
        for (let i = 0; i < activeJobs.length; i++) {
          activeJobs[i].kind = 'variant';
          const jobData = { check_job: activeJobs[i] };
          const newJob = await JobService.createCheckJob(id, jobData);
          newJobs.push(newJob);
        }
        dispatch({ type: types.JOBS_CREATED, newJobs });
      }
    } catch (error) {
      console.error(error);
    }
  };
}
