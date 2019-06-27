import React from 'react';
import { connect } from 'react-redux';
import TextInput from '../Forms/TextInput';
import { addAnswer } from '../../actions/general';
import './add-answer.css';

class AddAnswer extends React.Component {
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
        <TextInput name="answerToAdd" onChange={this.onChange} label="Добавить ответ" />
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
