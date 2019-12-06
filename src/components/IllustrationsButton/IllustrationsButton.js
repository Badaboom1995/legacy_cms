import React, { Component } from 'react';
import FilesUtilit from 'utilits/FilesUtilit/FilesUtilit';
import './illustrations-button.scss';

class IllustrationsButton extends Component {
  saveIllustrations = (evt) => {
    const { onChange } = this.props;
    const files = Array.from(evt.target.files);

    if (files.length) {
      FilesUtilit.checkFilesArrayMimeType('image', files);
      onChange(files);
    }
  }

  render = () => {
    const { className, multiple, isLoaded} = this.props;

    return (
      <label className={`${className} illustrations-button button button--upload`}>
        { `${isLoaded ? 'Изменить' : 'Добавить' } иллюстрацию` }
        <input
          type="file"
          multiple={Boolean(multiple)}
          onChange={this.saveIllustrations}
          hidden
        />
      </label>
    )
  }
}

export default IllustrationsButton;
