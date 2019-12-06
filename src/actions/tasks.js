export const addOption = (name, value) => ({
  type: 'ADD_OPTION',
  name,
  value,
});
export const getTasks = params => ({
  type: 'GET_TASKS',
  params,
});
export const getTasksPart = params => ({
  type: 'GET_TASKS_PART',
  params,
});
export const updateTask = (id, param, value) => ({
  type: 'UPDATE_TASK',
  id,
  param,
  value,
});
export const deleteTask = id => ({
  type: 'DELETE_TASK',
  id,
});
export const clearTasks = () => ({
  type: 'CLEAR_TASKS',
});
export const updateTaskGeneration = generation => ({
  type: 'UPDATE_TASK_GENERATION',
  generation,
});
export const createLessonFromTask = taskId => ({
  type: 'CREATE_LESSON_FROM_TASK',
  taskId,
});
