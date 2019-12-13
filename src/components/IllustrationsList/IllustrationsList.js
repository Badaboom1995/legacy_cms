import React, { Component } from 'react';
import FilesUtilit from 'utilits/FilesUtilit/FilesUtilit';
import './illustrations-list.scss';

class IllustrationsList extends Component {
  changeIllustration = (opts) => {
    const { evt } = opts;
    const { onChange } = this.props;
    const file = Array.from(evt.target.files)[0];

    if (file) {
      FilesUtilit.checkFileMimeType('image', file);
      onChange({ ...opts, file });
    }
  }

  removeIllustration = (opts) => {
    const { onRemove } = this.props;
    onRemove(opts);
  }

  render = () => {
    const { illustrations } = this.props;
    const baseClassName = 'illustrations-list';

    return (
      <ul className={baseClassName}>
        {illustrations.map((item, index) => (
          <li className={`${baseClassName}__item`} key={item.name || item.filename}>
            <label className={`${baseClassName}__image-label`}>
              <img className={`${baseClassName}__image`} src={FilesUtilit.getImageURL(item)} alt={item.name} />
              <input
                type="file"
                onChange={(evt) => this.changeIllustration({ evt, name: item.name, index })}
                hidden
              />
            </label>
            <button
              className={`${baseClassName}__remove-button`}
              onClick={() => this.removeIllustration({ name: item.name, index })}
            />
          </li>
        ))}
      </ul>
    )
  }
}

export default IllustrationsList;
