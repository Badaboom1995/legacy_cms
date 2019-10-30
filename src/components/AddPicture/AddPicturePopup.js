import React from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button/Button';
import AddPictureContainer from './AddPictureContainer';

import './upload-image.scss';

class AddPicturePopup extends React.Component {
  state = {
    visible: false,
  };
  togglePopupVisibility = e => {
    if (e.target == e.currentTarget) {
      this.setState(state => ({ visible: state.visible ? false : true }));
    }
  };
  render() {
    return (
      <div>
        <Button className="button--upload" onClick={this.togglePopupVisibility}>
          Добавить картинку
        </Button>
        {this.state.visible && (
          <div className="upload-image__popup" onClick={this.togglePopupVisibility}>
            <div className="upload-image__popup-wrapper">
              <h2 className="upload-image__popup-title">Добавление картинки</h2>
              <div>
                <AddPictureContainer />
              </div>
              <div className="upload-image__footer">
                <div>
                  <Button onClick={this.togglePopupVisibility} className="button--upload">
                    Сохранить
                  </Button>
                </div>
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
