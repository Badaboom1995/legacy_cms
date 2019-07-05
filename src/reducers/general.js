const generalReducerDefaultState = {
  answers: ['qwe', 'asd', 'zxc'],
  columns: [
    {
      id: 'column-1',
      title: 'To-do',
      answerIds: [],
    },
  ],
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
    case 'REMOVE_COLUMN':
      return {
        ...state,
        answers: state.columns.filter(item => {
          return item.id != action.column.id;
        }),
      };

    default:
      return state;
  }
};
