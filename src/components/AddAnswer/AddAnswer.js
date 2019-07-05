import React from 'react';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput/TextInput';
import { addAnswer } from 'actions/general';
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
    }
  };

  render() {
    return (
      <div className="add-answer">
        <TextInput
          name="answerToAdd"
          value={this.state.answer}
          onChange={this.onChange}
          label="Добавить ответ"
        />
        <button className="button button--add" onClick={this.addAnswer}>
          Добавить ответ
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(AddAnswer);
