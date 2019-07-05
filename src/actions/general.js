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
export const removeColumn = id => ({
  type: 'REMOVE_COLUMN',
  id,
});
