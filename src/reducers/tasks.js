const tasksReducerDefaultState = {
  taskList: [],
  taskLessons: {},
  loading: false,
  isAllReceived: false,
};

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
    case 'TASK_LESSON_RECEIVED':
      return {
        ...state,
        taskLessons: {
          ...state.taskLessons,
          [action.payload.taskId]: { ...action.payload.lesson },
        }
      };
    default:
      return state;
  }
};

export function getTaskLesson(state, taskId) {
  const { tasks } = state;
  return tasks.taskLessons[taskId];
}
