import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';

import './add-answer.scss';

class AddAnswer extends React.Component {
  state = {
    answer: '',
  };

  render() {
    return (
      <div className="">
        <Button>Добавить картинку</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(AddAnswer);
