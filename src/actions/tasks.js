export const addOption = (name, value) => ({
  type: 'ADD_OPTION',
  name,
  value,
});
export const getTasks = params => ({
  type: 'GET_TASKS',
  params,
});
export const deleteTask = id => ({
  type: 'DELETE_TASK',
  id,
});
export const clearTasks = () => ({
  type: 'CLEAR_TASKS',
});
