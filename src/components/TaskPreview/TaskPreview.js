import React from 'react';
import { connect } from 'react-redux';
import { removeGeneration } from 'actions/general';
import './task-preview.scss';

class TaskPreview extends React.Component {
  deleteGeneration = index => {
    this.props.dispatch(removeGeneration(index));
  };
  render() {
    const { chapter, difficulty, grade, subject, name } = this.props.tasks;
    return (
      <div className={`${this.props.className} task-preview `}>
        <div className="task-preview__main">
          <p className="task-preview__title">{name || 'Название'}</p>
          <p className="task-preview__subtitle">{chapter || 'Тема'}</p>
          <span className="task-preview__param">{difficulty || 'Cложность'}</span>
          <span className="task-preview__param">{grade ? `${grade} класс` : 'Класс'}</span>
          <span className="task-preview__param">{(subject && subject.name) || 'Предмет'}</span>
        </div>

        <div>
          {this.props.general.generations.map((generation, index) => {
            return (
              <div className="task-preview__main task-preview__main--generation" key={index}>
                <h3 className="task-preview__title">{generation.text}</h3>
                <span className="task-preview__subtitle">{generation.kind}</span>
                <div className="task-preview__generations">
                  {generation.answers.map((answer, index) => {
                    return (
                      <p
                        className={`task-preview__generation-answer 
                        ${generation.rightAnswers.includes(answer) &&
                          'task-preview__generation-answer--right'}`}
                        key={index}
                      >
                        {answer}
                      </p>
                    );
                  })}
                </div>
                <button
                  onClick={() => {
                    this.deleteGeneration(index);
                  }}
                >
                  delete
                </button>
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
