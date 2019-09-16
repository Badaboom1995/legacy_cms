import React from 'react';
import { connect } from 'react-redux';
import AddPictureOption from './AddPictureOption';

import './upload-image.scss';

class AddPictureChooseOption extends React.Component {
  render() {
    return (
      <div className="upload-image__choose-option">
        <div className="upload-image__options">
          <AddPictureOption
            chooseOption={this.props.chooseOption}
            percents="100%"
            text="ширина 920px высота от 150 до 300px"
          />
          <AddPictureOption
            chooseOption={this.props.chooseOption}
            percents="66%"
            text="ширина 600px высота от 200 до 600px"
          />
          <AddPictureOption
            chooseOption={this.props.chooseOption}
            percents="50%"
            text="ширина 450px высота от 200 до 600px"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(AddPictureChooseOption);
