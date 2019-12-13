import config from '../config';
import axios from 'axios';
import FilesUtilit from 'utilits/FilesUtilit/FilesUtilit';

const base_url = config.api.url;
const base_headers = {
  Accept: 'application/json',
  crossDomain: true,
};
const FIRST_CHAR_CODE = 97;

function makeParamsString(params) {
  const flatArray = Object.entries(params).reduce((sum, [key, val]) => {
    switch (typeof val) {
      case 'object':
        return [
          ...sum,
          ...Object.entries(val).map(([filterKey, filterValue]) => `${key}[${filterKey}]=${filterValue.toString()}`),
        ];
      default:
        return [
          ...sum,
          `${key}=${val.toString()}`,
        ];
    }
  }, []);
  return flatArray.join('&');
}

function combineUrl({ endpoint, params }) {
  const apiUrl = base_url;
  const isNeedParams = params && typeof params === 'object';
  const paramsString = isNeedParams ? makeParamsString(params) : '';
  let result = `${apiUrl}${endpoint}`;
  if (paramsString) {
    result += `?${paramsString}`;
  }
  return result;
}

class FilesService {
  async uploadIllustrations({ files, generationId }) {
    try {
      FilesUtilit.checkFilesArrayMimeType("image", files);

      const data = new FormData();
      files.forEach((file, index) => {
        data.append(
          `check_generation[illustrations][${String.fromCharCode(FIRST_CHAR_CODE + index)}]`,
          file,
        );
      })

      const response = await axios.put(`${base_url}teachers/check_generations/${generationId}`, data, {
          headers: {
            ...base_headers,
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          },
        })

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async removeIllustrations({ indexes, generationId }) {
    try {
      const data = new FormData();
      indexes.forEach((index) => {
        data.append(
          `check_generation[illustrations][${String.fromCharCode(FIRST_CHAR_CODE + index)}]`,
          null,
        );
      })

      const response = await axios.put(`${base_url}teachers/check_generations/${generationId}`, data, {
          headers: {
            ...base_headers,
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          },
        })

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new FilesService();
