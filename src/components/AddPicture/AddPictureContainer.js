import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import AddAnswer from 'components/AddAnswer/AddAnswer';
import AddPictureButton from './AddPictureButton';
import { addImages, addImagesAnswers, deleteImage, deleteImageAnswer } from 'actions/images';

class AddPicture extends React.Component {
  render() {
    return (
      <div className="upload-image">
        <div className="upload-image__slot">
          <AddPictureButton saveImages={addImagesAnswers} deleteImage={deleteImageAnswer} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images.images,
  imagesAnswers: state.images.imagesAnswers,
});

export default connect(mapStateToProps)(AddPicture);
