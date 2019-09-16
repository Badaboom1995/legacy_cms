const tasksReducerDefaultState = {
  images: [],
  imagesAnswers: [],
};

export default (state = tasksReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_IMAGES':
      return {
        ...state,
        images: action.images,
      };
    case 'ADD_IMAGES_ANSWERS':
      return {
        ...state,
        imagesAnswers: action.images,
      };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter(item => {
          return item.name != action.imageName;
        }),
      };
    case 'DELETE_IMAGE_ANSWER':
      return {
        ...state,
        imagesAnswers: state.imagesAnswers.filter(item => {
          return item.name != action.imageName;
        }),
      };
    default:
      return state;
  }
};
