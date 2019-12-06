import config from 'config';

const API_URL = config.api.root;

class FilesUtilit {
  fileTypes = ["image"];

  allowedMimeTypes = {
    image: ["image/svg+xml"]
  }

  checkFileType = (type) => {
    const isCorrect = this.fileTypes.some(it => it === type);
    if (!isCorrect) throw new Error(`checkFileType: ${type}, expected types: ${this.fileTypes.join(', ')}`);
    return isCorrect;
  }

  checkFileMimeType = (fileType, file) => {
    this.checkFileType(fileType);
    const allowedMimeTypes = this.allowedMimeTypes[fileType];
    const isCorrect = allowedMimeTypes.some(it => it === file.type);
    if (!isCorrect) throw new Error(`checkMimeType: ${file.type}, expected types: ${allowedMimeTypes.join(', ')}`);
    return isCorrect;
  }

  checkFilesArrayMimeType = (filesType, filesArr) => {
    const isCorrect = filesArr.every(file => this.checkFileMimeType(filesType, file));
    return isCorrect;
  }

  isArrayOfFiles = (arr) => {
    if (!arr) throw new Error('FilesUtilit.isArrayOfFiles: Argument is required');
    return Array.isArray(arr) && arr.every(it => it instanceof File);
  };

  getImageURL = (image = {}) => {
    let path = '';

    if (image instanceof File) {
      path = URL.createObjectURL(image);
    } else if (image.path) {
      path = `${API_URL}${image.path}`;
    }

    return path;
  };
}

export default new FilesUtilit();
