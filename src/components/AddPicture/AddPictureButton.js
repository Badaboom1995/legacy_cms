import React from 'react';
import { connect } from 'react-redux';
import { addImages, addImagesAnswers, deleteImage, deleteImageAnswer } from 'actions/images';

import './upload-image.scss';

class AddPictureButton extends React.Component {
  savePictures = e => {
    const images = Array.from(e.target.files);
    this.props.multiple
      ? this.props.dispatch(addImagesAnswers(images))
      : this.props.dispatch(addImages(images));
  };
  deletePicture = () => {};
  render() {
    const images = this.props.multiple ? this.props.imagesAnswers : this.props.images;
    return (
      <div className="upload-image__button-area">
        {!images.length ? (
          <div>
            <label className="button button--upload-big" htmlFor="upload-image">
              Добавить картинку
            </label>
            <input
              type="file"
              id="upload-image"
              className="button button--hidden"
              onChange={e => {
                this.savePictures(e);
              }}
              multiple
            />
          </div>
        ) : (
          <div className="upload-image__previews-list">
            {images.map((item, index) => (
              <span className="upload-image__loaded-item" key={index}>
                <div>
                  <div className="upload-image__image-wrapper">
                    <img src={URL.createObjectURL(item)} alt="" />
                  </div>
                </div>
                <p>
                  <span className="upload-image__name">{item.name}</span>
                  <button
                    onClick={() => {
                      console.log(this.props);
                      this.props.multiple
                        ? this.props.dispatch(deleteImageAnswer(item.name))
                        : this.props.dispatch(deleteImage(item.name));
                    }}
                  >
                    delete
                  </button>
                </p>
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images.images,
  imagesAnswers: state.images.imagesAnswers,
});

export default connect(mapStateToProps)(AddPictureButton);
