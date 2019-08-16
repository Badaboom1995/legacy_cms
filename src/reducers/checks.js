const generalReducerDefaultState = {
  test_name: '',
  subject: '',
  grade: '',
  difficulty: '',
  type: '',
  tasks: [],
};

export default (state = generalReducerDefaultState, action) => {
  switch (action.type) {
    case 'CREATE_CHECK':
      return {
        ...state,
        check: {
          test_name: action.check.test_name,
          subject: action.check.subject,
          grade: action.check.grade,
        },
      };
    case 'ADD_OPTION_CHECK':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'ADD_TASK_TO_TEST':
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      };
    default:
      return state;
  }
};
