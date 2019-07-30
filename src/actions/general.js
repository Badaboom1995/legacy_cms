export const addAnswer = answer => ({
  type: 'ADD_ANSWER',
  answer,
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
export const changeAnswerIndex = column => ({
  type: 'CHANGE_ANSWER_INDEX',
  column,
});
export const saveGeneration = generation => ({
  type: 'SAVE_GENERATION',
  generation,
});
export const changeOption = (name, value) => ({
  type: 'CHANGE_OPTION',
  name,
  value,
});
export const clearState = () => ({
  type: 'CLEAR_STATE',
});
