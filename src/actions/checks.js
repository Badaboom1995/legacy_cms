export const createCheck = check => ({
  type: 'CREATE_CHECK',
  check,
});
export const addOption = (name, value) => ({
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
export const deleteChecks = id => ({
  type: 'DELETE_CHECK',
  id,
});
