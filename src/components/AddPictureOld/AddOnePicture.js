import React from 'react';
import { connect } from 'react-redux';
import AddPictureButton from './AddPictureButton';

class AddOnePicture extends React.Component {
  render() {
    return (
      <div>
        <div className="upload-image__preview task-preview__main">
          <div
            style={{
              width:
                parseInt(this.props.percents) === 100
                  ? '100%'
                  : `${100 - parseInt(this.props.percents)}%`,
            }}
            className="upload-image__preview-task"
          >
            <p>{this.props.generationName}</p>
          </div>
          <div className="upload-image__preview-image" style={{ width: this.props.percents }}>
            <AddPictureButton percents={this.props.percents} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  generationName: state.general.text || 'Здесь будет название задания',
});

export default connect(mapStateToProps)(AddOnePicture);
