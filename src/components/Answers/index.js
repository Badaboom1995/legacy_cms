import React from "react";
import { connect } from "react-redux";

class Answers extends React.Component {
  state = {
    rightAnswers: []
  };
  chooseAnswer = e => {
    e.persist();
    if (this.props.multipleChoise) {
      this.setState(state => ({
        rightAnswers: [...state.rightAnswers, parseInt(e.target.dataset.key)]
      }));
    } else {
      this.setState(state => ({
        rightAnswers: [parseInt(e.target.dataset.key)]
      }));
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.props.general.answers.length > 0 && (
          <div className="answers">
            <h2 className="answers__title">Ответы</h2>
            <ul>
              {this.props.general.answers.map((answer, index) => {
                return (
                  <li
                    className={`answer ${this.state.rightAnswers.indexOf(
                      index
                    ) > -1 && "answer--true"}`}
                    key={index}
                    data-key={index}
                    onClick={this.chooseAnswer}
                  >
                    {answer}
                  </li>
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
  general: state.general
});

export default connect(mapStateToProps)(Answers);
