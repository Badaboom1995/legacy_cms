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
    case 'REMOVE_ANSWER':
      return {
        ...state,
        answers: state.answers.filter(item => {
          return item != action.answer;
        }),
      };

    default:
      return state;
  }
};
