import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button/Button';
import AddPictureOption from './AddPictureOption';
import AddPictureButton from './AddPictureButton';
import AddPictureChooseOption from './AddPictureChooseOption';
import AddPictureChooseAnswers from './AddPictureChooseAnswers';
import AddOnePicture from './AddOnePicture';
import AddSeveralPictures from './AddSeveralPictures';

import './upload-image.scss';

class AddPicturePopup extends React.Component {
  state = {
    visible: false,
    step: 1,
    option: '',
  };
  togglePopupVisibility = e => {
    if (e.target == e.currentTarget) {
      this.setState(state => ({ visible: state.visible ? false : true }));
    }
  };
  prevStep = () => {
    this.setState(state => ({ step: state.step > 1 ? state.step - 1 : state.step }));
  };
  nextStep = () => {
    this.setState(state => ({ step: state.step < 2 ? state.step + 1 : state.step }));
  };
  chooseOption = (text, value) => {
    this.nextStep();
    this.setState(() => ({ text, value }));
  };
  getPreviewTextWidth = () => {};
  render() {
    const imagesLoaded = this.props.multiple
      ? this.props.images.imagesAnswers.length > 0
      : this.props.images.images.length > 0;
    return (
      <div>
        <Button className="button--upload" onClick={this.togglePopupVisibility}>
          Добавить картинку
        </Button>
        {this.state.visible && (
          <div className="upload-image__popup" onClick={this.togglePopupVisibility}>
            <div className="upload-image__popup-wrapper">
              <h2 className="upload-image__popup-title">Добавление картинки</h2>
              {this.state.step == 1 &&
                (this.props.multiple ? (
                  <AddPictureChooseAnswers chooseOption={this.chooseOption} />
                ) : (
                  <AddPictureChooseOption chooseOption={this.chooseOption} />
                ))}
              {this.state.step == 2 && (
                <div>
                  <AddPictureOption
                    selected
                    chooseOption={this.chooseOption}
                    percents={this.state.value}
                    text={this.state.text}
                  />
                  {this.props.multiple ? (
                    <AddSeveralPictures percents={this.state.value} text={this.state.text} />
                  ) : (
                    <AddOnePicture percents={this.state.value} text={this.state.text} />
                  )}
                </div>
              )}
              <div className="upload-image__footer">
                {imagesLoaded ? (
                  <div>
                    <Button onClick={this.prevStep} className="button--secondary button--back">
                      Назад
                    </Button>
                    <Button onClick={this.togglePopupVisibility} className="button--upload">
                      Сохранить
                    </Button>
                  </div>
                ) : (
                  <Button onClick={this.prevStep} className="button--secondary button--back">
                    Назад
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  generationName: state.general.text || 'Здесь будет название задания',
  images: state.images,
  imagesLoaded: state.images.images.length > 0,
});

export default connect(mapStateToProps)(AddPicturePopup);
