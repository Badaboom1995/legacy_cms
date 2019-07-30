import React from 'react';
import { connect } from 'react-redux';
import './generations.scss';

class FinishAddingTask extends React.Component {
  render() {
    return (
      <div className="content__fragment">
        <p>Сложность: {this.props.tasks.difficulty}</p>
        <p>Класс: {this.props.tasks.grade}</p>
        <p>Предмет: {this.props.tasks.subject.name}</p>
        <div>
          <p>Генерации:</p>
          {this.props.general.generations.map((generation, index) => {
            return (
              <div className="generation" key={index}>
                <h3>{generation.text}</h3>
                <span>{generation.kind}</span>
                <br />
                <br />
                {generation.answers.map((answer, index) => {
                  return generation.rightAnswers.includes(answer) ? (
                    <p key={index}>
                      <b>{answer}</b>
                    </p>
                  ) : (
                    <p key={index}>{answer}</p>
                  );
                })}
                <br />
              </div>
            );
            {
              /* if (this.props.general.rightAnswers.includes(item)) {
              return (
                <p key={item}>
                  <b>{item}</b>
                </p>
              );
            } else {
              return <p key={item}>{item}</p>;
            } */
            }
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
  tasks: state.tasks,
});

export default connect(mapStateToProps)(FinishAddingTask);
