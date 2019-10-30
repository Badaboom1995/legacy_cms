import React from 'react';
import { connect } from 'react-redux';
import AddPictureButton from './AddPictureButton';

class AddPicturePreview extends React.Component {
  render() {
    return (
      <div className="upload-image">
        <AddPictureButton />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  images: state.images.images,
});

export default connect(mapStateToProps)(AddPicturePreview);
