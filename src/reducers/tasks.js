const tasksReducerDefaultState = {
  tasksList: [],
  loading: false,
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
    case 'TASKS_RECEIVED':
      return {
        ...state,
        taskList: action.tasks,
        loading: false,
      };
    case 'DELETE_TASK':
      return {
        ...state,
        taskList: state.taskList.filter(item => {
          return item.id != action.id;
        }),
      };
    default:
      return state;
  }
};
