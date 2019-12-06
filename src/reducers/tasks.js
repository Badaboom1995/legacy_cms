const tasksReducerDefaultState = {
  taskList: [],
  loading: false,
  isAllReceived: false,
};

const updateTaskGeneration = (state, action) => {
  const { taskList } = state;
  const { generation: { id, check_job_id } } = action;
  const targetTaskIndex = taskList.findIndex(it => it.id === check_job_id);
  const targetTask = taskList[targetTaskIndex];

  console.log(targetTask);
  if (targetTask) {
    const { check_generations } = targetTask;
    const targetGenIndex = check_generations.findIndex(it => it.id === id);
    check_generations.splice(targetGenIndex, 1, action.generation);
    targetTask.check_generations = check_generations;
    taskList.splice(targetTaskIndex, 1, targetTask);
  }
  console.log(targetTask, taskList, check_job_id, targetTaskIndex);
  return {
    ...state,
    taskList: [...taskList],
  }
}

export default (state = tasksReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_OPTION':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'GET_TASKS':
      return { ...state, loading: true };
    case 'GET_TASKS_PART':
      return { ...state, loading: true };
    case 'TASKS_RECEIVED':
      return {
        ...state,
        taskList: [...action.tasks],
        isAllReceived: false,
        loading: false,
      };
    case 'TASKS_PART_RECEIVED':
      return {
        ...state,
        taskList: [...state.taskList, ...action.tasks],
        loading: false,
      };
    case 'TASKS_RECEIVED_ALL':
      return {
        ...state,
        isAllReceived: true,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        taskList: state.taskList.filter(item => {
          return item.id != action.id;
        }),
      };
    case 'CLEAR_TASKS':
      return {
        ...state,
        difficulty: '',
        name: '',
        grade: '',
        chapter: '',
      };
    case 'UPDATE_TASK_GENERATION':
      return updateTaskGeneration(state, action);
    default:
      return state;
  }
};
