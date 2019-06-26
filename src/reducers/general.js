const generalReducerDefaultState = {
  answers: [1],
};

export default (state = generalReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        ...state,
        answers: [...state.answers, action.answer],
      };

    default:
      return state;
  }
};
