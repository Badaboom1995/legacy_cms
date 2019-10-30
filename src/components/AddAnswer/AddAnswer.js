import React from 'react';
import { connect } from 'react-redux';
import TextArea from 'components/TextArea/TextArea';
import { addAnswer } from 'actions/general';
import AddPicture from 'components/AddPicture/AddPicture';
import './add-answer.scss';

class AddAnswer extends React.Component {
  state = {
    answer: '',
  };
  onChange = value => {
    this.setState(() => ({ answer: value }));
  };

  addAnswer = () => {
    if (!this.props.general.answers.includes(this.state.answer)) {
      this.props.dispatch(addAnswer(this.state.answer));
      this.props.addAnswer && this.props.addAnswer(this.state.answer);
    }
  };

  render() {
    return (
      <div className="add-answer">
        <TextArea
          name="answerToAdd"
          value={this.state.answer}
          onChange={this.onChange}
          label="Добавить ответ"
          mathMode
        />
        <button className="button button--add" onClick={this.addAnswer}>
          Добавить ответ
        </button>
        {/* <AddPicture multiple /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  imagesAnswers: state.images.imagesAnswers,
});

export default connect(mapStateToProps)(AddAnswer);
