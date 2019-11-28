const tasksReducerDefaultState = {
  taskList: [],
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
    case 'UPDATE_TASK':
      return {
        ...state,
        taskList: state.taskList.map(item => {
          if (item.id == action.id) {
            item[action.param] = action.value;
          }
          console.log(item.not_for_teacher);
          return item;
        }),
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
    default:
      return state;
  }
};
