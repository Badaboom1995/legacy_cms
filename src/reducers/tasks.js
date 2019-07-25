const tasksReducerDefaultState = {};

export default (state = tasksReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_OPTION':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};
