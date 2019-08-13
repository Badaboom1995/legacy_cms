const tasksReducerDefaultState = {};

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
    default:
      return state;
  }
};
