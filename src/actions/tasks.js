export const addOption = (name, value) => ({
  type: 'ADD_OPTION',
  name,
  value,
});
export const getTasks = () => ({
  type: 'GET_TASKS',
});
