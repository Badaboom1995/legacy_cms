import uuid from 'uuid';

export const addAnswer = answer => ({
  type: 'ADD_ANSWER',
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
export const changeAnswerIndex = column => ({
  type: 'CHANGE_ANSWER_INDEX',
  column,
});
