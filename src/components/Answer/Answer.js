import React from 'react';
import { connect } from 'react-redux';
import './answer.css';
import { removeAnswer } from '../../actions/general';

class Answer extends React.Component {
  chooseAnswer = e => {
    e.persist();
    const answerChoosed = this.props.rightAnswers.includes(e.target.innerHTML);
    const timer = setTimeout(() => {
      if (answerChoosed) {
        this.props.unchooseAnswer(e);
      } else {
        this.props.chooseAnswer(e);
      }
    }, 200);
  };
  removeAnswer = () => {
    this.props.dispatch(removeAnswer(this.props.answer));
  };

  render() {
    const { index, answer, rightAnswers } = this.props;
    return (
      <li
        className={`answers__item ${rightAnswers.includes(answer) && 'answers__item--true'}`}
        key={index}
        data-key={index}
        onClick={this.chooseAnswer}
        onDoubleClick={this.removeAnswer}
      >
        {answer}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Answer);
