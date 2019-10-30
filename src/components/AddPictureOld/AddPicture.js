import React from 'react';
import { connect } from 'react-redux';
import AddPicturePopup from './AddPicturePopup';
import { deleteImage, deleteImageAnswer } from 'actions/images';

class AddPicture extends React.Component {
  state = {
    images: [],
  };
  render() {
    const images = this.props.multiple ? this.props.imagesAnswers : this.props.images;
    return (
      <div className="upload-image">
        <AddPicturePopup multiple={this.props.multiple} />
        {images.map((item, index) => (
          <div key={index}>
            <span className="upload-image__name">{item.name}</span>
            <button
              onClick={() => {
                this.props.multiple
                  ? this.props.dispatch(deleteImageAnswer(item.name))
                  : this.props.dispatch(deleteImage(item.name));
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  images: state.images.images,
  imagesAnswers: state.images.imagesAnswers,
});

export default connect(mapStateToProps)(AddPicture);
