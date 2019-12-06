import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addIllustrationsFiles, changeIllustrationFile, removeIllustrationFile } from 'actions/illustrations';
import { getIllustrationsFiles } from 'reducers/illustrations';
import IllustrationsList from 'components/IllustrationsList/IllustrationsList';
import IllustrationsButton from 'components/IllustrationsButton/IllustrationsButton';
import FilesUtilit from 'utilits/FilesUtilit/FilesUtilit';
import './add-illustration.scss';

class AddIllustration extends Component {
  addIllustrations = (files) => {
    const { dispatch, generationIndex } = this.props;

    dispatch(addIllustrationsFiles({ generationIndex, files }));
  }

  changeIllustration = ({ evt, name }) => {
    const { dispatch, generationIndex } = this.props;
    const file = Array.from(evt.target.files)[0];

    if (file) {
      FilesUtilit.checkFileMimeType('image', file);
      dispatch(changeIllustrationFile({ generationIndex, fileName: name, file }));
    }
  }

  removeIllustration = ({ name }) => {
    const { dispatch, generationIndex } = this.props;
    dispatch(removeIllustrationFile({ generationIndex, fileName: name }));
  }

  render = () => {
    const { files, multiple } = this.props;
    const isLoaded = files && files.length;
    const baseClassName = 'illustrations';

    return (
      <div className={`${baseClassName}__area`}>
        {isLoaded
          ? (
            <IllustrationsList
              illustrations={files}
              onChange={this.changeIllustration}
              onRemove={this.removeIllustration}
            />
          )
          : null
        }
        <IllustrationsButton
          multiple={multiple}
          isLoaded={isLoaded}
          onChange={(files) => this.addIllustrations(files)}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { generationIndex } = ownProps;

  return {
    files: getIllustrationsFiles(state, generationIndex),
  }
};

export default connect(mapStateToProps)(AddIllustration);
