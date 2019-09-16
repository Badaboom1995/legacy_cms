import React from 'react';
import { connect } from 'react-redux';
import AddPictureButton from './AddPictureButton';

class AddSeveralPictures extends React.Component {
  render() {
    return (
      <div>
        <div className="upload-image__preview task-preview__main">
          <div className="upload-image__preview-image">
            <AddPictureButton percents={this.props.percents} multiple />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(AddSeveralPictures);
