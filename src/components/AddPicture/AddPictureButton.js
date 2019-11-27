import React from 'react';
import { connect } from 'react-redux';
import { addAnswer, addAnswerByIndex } from 'actions/general';
import TextInput from 'components/TextInput/TextInput';

import './upload-image.scss';

class AddPictureButton extends React.Component {
  savePictures = e => {
    const images = Array.from(e.target.files);
    this.props.dispatch(this.props.saveImages(images));
    images.forEach((item, index) => {
      this.props.dispatch(addAnswer('\xa0'.repeat(index)));
    });
  };
  changeAnswer = (answer, index) => {
    this.props.dispatch(addAnswerByIndex(answer, index));
  };
  render() {
    const images = this.props.imagesAnswers || this.props.images;
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
                  <TextInput
                    onChange={value => this.changeAnswer(value, index)}
                    value={this.props.answers[index]}
                  />
                </div>
                <p>
                  <span className="upload-image__name">{item.name}</span>
                  <button
                    onClick={() => {
                      this.props.dispatch(this.props.deleteImage(item.name));
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
  answers: state.general.answers,
});

export default connect(mapStateToProps)(AddPictureButton);
