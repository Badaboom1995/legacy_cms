import React from 'react';
import { connect } from 'react-redux';
import Answer from 'components/Answer/Answer';
import { addRightAnswer, addRightAnswers, removeRightAnswer } from 'actions/general';
import './answers.scss';

class Answers extends React.Component {
  state = {
    rightAnswers: [],
  };
  decodeHTML = html => {
    // Функция для распознавания спецсимволов <, >, /, и тд
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };
  chooseAnswer = e => {
    e.persist();
    // const righAnswer = this.decodeHTML(e.target.innerHTML);
    const righAnswer = e.target.dataset.answer;
    if (this.props.multipleChoise) {
      this.setState(state => ({
        rightAnswers: [...state.rightAnswers, righAnswer],
      }));
      this.props.dispatch(addRightAnswers(righAnswer));
    } else {
      this.setState(state => ({
        rightAnswers: [righAnswer],
      }));
      this.props.dispatch(addRightAnswer(righAnswer));
    }
  };

  unchooseAnswer = e => {
    const rightAnswers = this.state.rightAnswers.filter(answer => {
      return answer != e.target.dataset.answer;
    });
    this.setState(() => ({ rightAnswers }));
    this.props.dispatch(removeRightAnswer(e.target.dataset.answer));
  };

  render() {
    return (
      <React.Fragment>
        {this.props.general.answers.length > 0 && (
          <div className="answers">
            <h2 className="answers__title">Ответы</h2>
            <ul className="answers__list">
              {this.props.general.answers.map((answer, index) => {
                return (
                  <Answer
                    rightAnswers={this.state.rightAnswers}
                    key={index}
                    chooseAnswer={this.chooseAnswer}
                    unchooseAnswer={this.unchooseAnswer}
                    answer={answer}
                    image={this.props.imagesAnswers[index]}
                  ></Answer>
                );
              })}
            </ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  imagesAnswers: state.images.imagesAnswers,
});

export default connect(mapStateToProps)(Answers);
