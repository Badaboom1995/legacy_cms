export const addAnswer = answer => ({
  type: 'ADD_ANSWER',
  answer,
});
export const addAnswerByIndex = (answer, index) => ({
  type: 'ADD_ANSWER_BY_INDEX',
  answer,
  index,
});
export const addRightAnswer = answer => ({
  type: 'ADD_RIGHT_ANSWER',
  answer,
});
export const addRightAnswers = answer => ({
  type: 'ADD_RIGHT_ANSWERS',
  answer,
});
export const addColumn = column => ({
  type: 'ADD_COLUMN',
  column,
});
export const removeAnswer = answer => ({
  type: 'REMOVE_ANSWER',
  answer,
});
export const removeRightAnswer = answer => ({
  type: 'REMOVE_RIGHT_ANSWER',
  answer,
});
export const addExpression = expression => ({
  type: 'ADD_EXPRESSION',
  expression,
});
export const removeExpression = expression => ({
  type: 'REMOVE_EXPRESSION',
  expression,
});
export const changeAnswerIndex = column => ({
  type: 'CHANGE_ANSWER_INDEX',
  column,
});
export const saveGeneration = generation => ({
  type: 'SAVE_GENERATION',
  generation,
});
export const removeGeneration = index => ({
  type: 'REMOVE_GENERATION',
  index,
});
export const changeOption = (name, value) => ({
  type: 'ADD_GENERAL_OPTION',
  name,
  value,
});
export const getChapters = () => ({
  type: 'GET_CHAPTERS',
});
export const getTopics = () => ({
  type: 'GET_TOPICS',
});
export const getSubjects = () => ({
  type: 'GET_SUBJECTS',
});
export const getLearningLevels = () => ({
  type: 'GET_LEARNING_LEVELS',
});
export const getScales = () => ({
  type: 'GET_SCALES',
});
export const getCheckModes = () => ({
  type: 'GET_CHECK_MODES',
});
export const clearState = () => ({
  type: 'CLEAR_STATE',
});
export const clearGenerations = () => ({
  type: 'CLEAR_GENERATIONS',
});
