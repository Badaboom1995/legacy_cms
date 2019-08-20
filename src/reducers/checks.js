const generalReducerDefaultState = {
  test_name: '',
  subject: '',
  grade: '',
  difficulty: '',
  type: '',
  tasks: [],
  checks_list: [],
  loading: false,
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
    case 'CHECKS_RECEIVED':
      return {
        ...state,
        checks_list: action.checks,
        loading: false,
      };
    case 'GET_CHECKS':
      return {
        ...state,
        loading: true,
      };
    case 'DELETE_CHECK':
      return {
        ...state,
        checks_list: checks_list.filter(item => item.id != action.id),
      };
    default:
      return state;
  }
};
