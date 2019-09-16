import React from 'react';
import Button from 'components/Button/Button';

const AddPictureOption = ({ percents, text, chooseOption, selected }) => (
  <div className={`upload-image__option ${selected && 'upload-image__option--selected'}`}>
    <Button
      onClick={() => {
        chooseOption(text, percents);
      }}
      className={`button--full-width button--no-margin-bottom`}
    >
      {percents}
    </Button>
    <p className={`upload-image__info ${selected && 'upload-image__info--selected'}`}>{text}</p>
  </div>
);

export default AddPictureOption;
