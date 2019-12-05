export const addImages = images => ({
  type: 'ADD_IMAGES',
  images,
});
export const addImagesAnswers = images => ({
  type: 'ADD_IMAGES_ANSWERS',
  images,
});
export const deleteImage = imageName => ({
  type: 'DELETE_IMAGE',
  imageName,
});
export const deleteImageAnswer = imageName => ({
  type: 'DELETE_IMAGE_ANSWER',
  imageName,
});
export const resetImages = () => ({
  type: 'RESET_IMAGES',
});
