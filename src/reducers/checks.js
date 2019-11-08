import { SELECT_CHECK, UPDATE_SELECTED_CHECK, SAVE_SELECTED_CHECK } from 'actions/checks';
import { createSelector } from 'reselect';

const generalReducerDefaultState = {
  test_name: '',
  subject: '',
  grade: '',
  difficulty: '',
  type: '',
  tasks: [],
  checks_list: [],
  loading: false,
  selectedCheck: '',
  isAllReceived: false,
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
    case 'GET_CHECKS':
      return {
        ...state,
        loading: true,
        isAllReceived: false,
      };
    case 'GET_CHECKS_PART':
      return {
        ...state,
        loading: true,
      };
    case 'CHECKS_RECEIVED':
      return {
        ...state,
        checks_list: [...action.checks],
        loading: false,
      };
    case 'CHECKS_PART_RECEIVED':
      return {
        ...state,
        checks_list: [...state.checks_list, ...action.checks],
        loading: false,
      };
    case 'CHECKS_RECEIVED_ALL':
      return {
        ...state,
        isAllReceived: true,
      };
    case SELECT_CHECK:
      return {
        ...state,
        selectedCheck: state.checks_list.filter(item => item.id === action.id)[0] || {},
      };
    case UPDATE_SELECTED_CHECK:
      return {
        ...state,
        selectedCheck: action.updatedCheck,
      };
    case SAVE_SELECTED_CHECK:
      return {
        ...state,
        loading: true,
      };
    case 'SELECTED_CHECK_SAVED':
      return {
        ...state,
        checks_list: state.checks_list.map(item =>
          item.id == action.response.id ? action.response : item,
        ),
      };
    case 'DELETE_CHECK':
      return {
        ...state,
        checks_list: state.checks_list.filter(item => item.id != action.id),
      };
    default:
      return state;
  }
};
