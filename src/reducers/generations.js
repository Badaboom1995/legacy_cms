const generationsReducerDefaultState = {};

export default (state = tasksReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_GENNERATION':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};
