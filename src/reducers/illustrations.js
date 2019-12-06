const initialState = {
  entities: {},
};

const removeFile = (state, action) => {
  const { generationIndex, fileName } = action;
  const files = state.entities[generationIndex] || [];

  return {
    ...state,
    entities: {
      ...state.entities,
      [generationIndex]: files.filter(item => {
        return item.name != fileName;
      }),
    }
  }
}

const changeFile = (state, action) => {
  const { generationIndex, fileName, file } = action;
  const files = state.entities[generationIndex] || [];
  const index = files.findIndex(it => it.name === fileName);

  const copyArr = files.slice();
  copyArr.splice(index, 1, file);
  return {
    ...state,
    entities: {
      ...state.entities,
      [generationIndex]: copyArr,
    }
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ILLUSTRATIONS_FILES':
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.generationIndex]: [...action.files],
        }
      };
    case 'REMOVE_ILLUSTRATION_FILE':
      return removeFile(state, action);
    case 'CHANGE_ILLUSTRATION_FILE':
      return changeFile(state, action);
    case 'RESET_ILLUSTRATIONS':
      return initialState;
    default:
      return state;
  }
};

export function getIllustrationsEntities(state) {
  const { illustrations } = state;
  return illustrations.entities;
}

export function getIllustrationsFiles(state, generationIndex) {
  const { illustrations } = state;
  return illustrations.entities[generationIndex];
}
