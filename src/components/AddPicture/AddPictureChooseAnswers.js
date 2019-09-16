import React from 'react';
import { connect } from 'react-redux';
import AddPictureOption from './AddPictureOption';

import './upload-image.scss';

class AddPictureChooseAnswers extends React.Component {
  render() {
    return (
      <div className="upload-image__choose-option">
        <div className="upload-image__options">
          <AddPictureOption
            chooseOption={this.props.chooseOption}
            percents="2 картиники"
            text="ширина 450px высота от 200 до 600px"
          />
          <AddPictureOption
            chooseOption={this.props.chooseOption}
            percents="3 картиники"
            text="ширина 310 или 289px высота от 200 до 400px"
          />
          <AddPictureOption
            chooseOption={this.props.chooseOption}
            percents="4 картиники"
            text="ширина 215px высота от 215 до 400px"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(AddPictureChooseAnswers);
