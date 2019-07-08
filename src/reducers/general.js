import uuid from 'uuid';

const generalReducerDefaultState = {
  answers: [],
};

export default (state = generalReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        ...state,
        answers: [...state.answers, action.answer],
      };
    case 'ADD_COLUMN':
      return {
        ...state,
        columns: [...state.columns, action.column],
      };
    case 'REMOVE_ANSWER':
      return {
        ...state,
        answers: state.answers.filter(item => {
          return item != action.answer;
        }),
      };
    case 'CHANGE_ANSWER_INDEX':
      return {
        ...state,
        columns: state.columns.map(item => {
          if (item.id === action.column.id) {
            return action.column;
          }

          return item;
        }),
      };
    default:
      return state;
  }
};
