export const SELECT_CHECK = 'checks/SELECT_CHECK';
export const UPDATE_SELECTED_CHECK = 'checks/UPDATE_SELECTED_CHECK';
export const SAVE_SELECTED_CHECK = 'checks/SAVE_SELECTED_CHECK';

export const createCheck = check => ({
  type: 'CREATE_CHECK',
  check,
});
export const addCheckOption = (name, value) => ({
  type: 'ADD_OPTION_CHECK',
  name,
  value,
});
export const addTaskToTest = task => ({
  type: 'ADD_TASK_TO_TEST',
  task,
});
export const getChecks = () => ({
  type: 'GET_CHECKS',
});
export const selectCheck = id => ({
  type: SELECT_CHECK,
  id,
});
export const updateSelectedCheck = updatedCheck => ({
  type: UPDATE_SELECTED_CHECK,
  updatedCheck,
});
export const saveSelectedCheck = (id, check) => ({
  type: SAVE_SELECTED_CHECK,
  id,
  check,
});
export const deleteChecks = id => ({
  type: 'DELETE_CHECK',
  id,
});
