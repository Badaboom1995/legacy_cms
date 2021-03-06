import React from 'react';
import { connect } from 'react-redux';
import './answer.scss';
import { removeAnswer } from 'actions/general';
import TextUtilit from 'utilits/TextUtilit/TextUtilit';

class Answer extends React.Component {
  decodeHTML = html => {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
  chooseAnswer = e => {
    e.persist();
    const answerChoosed = this.props.rightAnswers.includes(e.target.dataset.answer);
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
    const { index, answer, rightAnswers, image } = this.props;
    return (
      <li
        className={`answers__item ${rightAnswers.includes(answer) && 'answers__item--true'}`}
        key={index}
        data-key={index}
        onClick={this.chooseAnswer}
        onDoubleClick={this.removeAnswer}
        data-answer={answer}
      >
        {image && <img className="answers__image" src={URL.createObjectURL(image)} alt="" />}
        {TextUtilit.handleText(answer)}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Answer);
