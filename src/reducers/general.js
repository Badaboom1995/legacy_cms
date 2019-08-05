const generalReducerDefaultState = {
  answers: [],
  rightAnswers: [],
  generations: [],
};

export default (state = generalReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ANSWER':
      return {
        ...state,
        answers: [...state.answers, action.answer],
      };
    case 'ADD_RIGHT_ANSWER':
      return {
        ...state,
        rightAnswers: [action.answer],
      };
    case 'ADD_RIGHT_ANSWERS':
      return {
        ...state,
        rightAnswers: [...state.rightAnswers, action.answer],
      };
    case 'REMOVE_ANSWER':
      return {
        ...state,
        answers: state.answers.filter(item => {
          return item != action.answer;
        }),
      };
    case 'REMOVE_RIGHT_ANSWER':
      return {
        ...state,
        rightAnswers: state.rightAnswers.filter(item => {
          return item != action.answer;
        }),
      };
    case 'CHANGE_OPTION':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'SAVE_GENERATION':
      return {
        ...state,
        generations: [...state.generations, action.generation],
      };
    case 'REMOVE_GENERATION':
      return {
        ...state,
        generations: state.generations.filter((item, index) => {
          console.log(index, ':', action.index);
          return index != action.index;
        }),
      };
    case 'CLEAR_STATE':
      return {
        ...state,
        answers: [],
        rightAnswers: [],
      };
    default:
      return state;
  }
};
