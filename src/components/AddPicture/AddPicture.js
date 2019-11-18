import React from 'react';
import { connect } from 'react-redux';
import AddPicturePopup from './AddPicturePopup';
import { deleteImage, deleteImageAnswer } from 'actions/images';

class AddPicture extends React.Component {
  render() {
    return (
      <div className="upload-image">
        <AddPicturePopup multiple={this.props.multiple} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images.images,
  imagesAnswers: state.images.imagesAnswers,
});

export default connect(mapStateToProps)(AddPicture);
