const generalReducerDefaultState = {
  expressions: [],
  answers: [],
  rightAnswers: [],
  generations: [],
  learning_levels: [],
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
    case 'ADD_EXPRESSION':
      return {
        ...state,
        expressions: [...state.expressions, action.expression],
      };
    case 'REMOVE_EXPRESSION':
      return {
        ...state,
        expressions: state.expressions.filter(item => {
          return item.value != action.expression.value;
        }),
      };
    case 'REMOVE_RIGHT_ANSWER':
      return {
        ...state,
        rightAnswers: state.rightAnswers.filter(item => {
          return item != action.answer;
        }),
      };
    case 'ADD_GENERAL_OPTION':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'GET_CHAPTERS':
      return {
        ...state,
        loading: true,
      };
    case 'GET_TOPICS':
      return {
        ...state,
        loading: true,
      };
    case 'GET_CHAPTERS':
      return {
        ...state,
        loading: true,
      };
    case 'GET_SUBJECTS':
      return {
        ...state,
        loading: true,
      };
    case 'GET_LEARNING_LEVELS':
      return {
        ...state,
        loading: true,
      };
    case 'CHAPTERS_RECEIVED':
      return {
        ...state,
        chapters: action.response,
        chaptersNames: action.chaptersNames,
      };
    case 'TOPICS_RECEIVED':
      return {
        ...state,
        topics: action.response,
        topicsNames: action.topicsNames,
      };
    case 'SUBJECTS_RECEIVED':
      return {
        ...state,
        subjects: action.response,
      };
    case 'LEARNING_LEVELS_RECEIVED':
      return {
        ...state,
        learning_levels: action.grades,
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
          return index != action.index;
        }),
      };
    case 'CLEAR_STATE':
      return {
        ...state,
        expressions: [],
        answers: [],
        rightAnswers: [],
      };
    case 'CLEAR_GENERATIONS':
      return {
        ...state,
        generations: [],
      };
    default:
      return state;
  }
};
