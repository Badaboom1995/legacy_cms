import React from 'react';
import { connect } from 'react-redux';
import { removeGeneration } from 'actions/general';

class TaskPreview extends React.Component {
  deleteGeneration = index => {
    this.props.dispatch(removeGeneration(index));
  };
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
                <p>
                  <button
                    onClick={() => {
                      this.deleteGeneration(index);
                    }}
                  >
                    delete
                  </button>
                </p>

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

export default connect(mapStateToProps)(TaskPreview);
