export const addIllustrationsFiles = ({ generationIndex, files }) => ({
  type: 'ADD_ILLUSTRATIONS_FILES',
  generationIndex,
  files,
});
export const changeIllustrationFile = ({ generationIndex, fileName, file }) => ({
  type: 'CHANGE_ILLUSTRATION_FILE',
  generationIndex,
  fileName,
  file,
});
export const removeIllustrationFile = ({ generationIndex, fileName }) => ({
  type: 'REMOVE_ILLUSTRATION_FILE',
  generationIndex,
  fileName,
});
export const resetIllustrations = () => ({
  type: 'RESET_ILLUSTRATIONS',
});
