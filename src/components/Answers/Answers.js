import React from 'react';
import { connect } from 'react-redux';
import Answer from 'components/Answer/Answer';
import { addRightAnswer, addRightAnswers, removeRightAnswer } from 'actions/general';
import './answers.scss';

class Answers extends React.Component {
  state = {
    rightAnswers: [],
  };

  chooseAnswer = e => {
    e.persist();
    if (this.props.multipleChoise) {
      this.setState(state => ({
        rightAnswers: [...state.rightAnswers, e.target.innerHTML],
      }));
      this.props.dispatch(addRightAnswers(e.target.innerHTML));
    } else {
      this.setState(state => ({
        rightAnswers: [e.target.innerHTML],
      }));
      this.props.dispatch(addRightAnswer(e.target.innerHTML));
    }
    console.log(this.props.general);
  };

  unchooseAnswer = e => {
    const rightAnswers = this.state.rightAnswers.filter(answer => {
      return answer != e.target.innerHTML;
    });
    this.setState(() => ({ rightAnswers }));
    this.props.dispatch(removeRightAnswer(e.target.innerHTML));
    console.log(this.props.general);
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
});

export default connect(mapStateToProps)(Answers);
