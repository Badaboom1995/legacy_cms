import React from 'react';
import { removeGeneration } from 'actions/general';
import './task-preview.scss';
import PropTypes from 'prop-types';

class TaskPreviewContainer extends React.Component {
  deleteGeneration = index => {
    this.props.dispatch(removeGeneration(index));
  };
  render() {
    const { generationsHidden } = this.props;
    const { chapter, difficulty, grade, subject, name } = this.props.task;
    return (
      <div key={this.props.key} className={`${this.props.className} task-preview `}>
        <div className="task-preview__main">
          <p className="task-preview__title">{name || 'Название'}</p>
          <p className="task-preview__subtitle">{chapter || 'Тема'}</p>
          <span className="task-preview__param">{difficulty || 'Cложность'}</span>
          <span className="task-preview__param">{grade ? `${grade} класс` : 'Класс'}</span>
          <span className="task-preview__param">{(subject && subject.name) || 'Предмет'}</span>
        </div>

        <div>
          {!generationsHidden &&
            this.props.task.check_generations.map((generation, index) => {
              return (
                <div className="task-preview__main task-preview__main--generation" key={index}>
                  <h3 className="task-preview__title">{generation.text}</h3>
                  <span className="task-preview__subtitle">{generation.kind}</span>
                  <ul className="task-preview__generations">
                    {/* {generation.answers.map((answer, index) => {
                      return (
                        <li
                          className={`task-preview__generation-answer 
                        ${generation.rightAnswers.includes(answer) &&
                          'task-preview__generation-answer--right'}`}
                          key={index}
                        >
                          {answer}
                        </li>
                      );
                    })} */}
                  </ul>
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

TaskPreviewContainer.propTypes = {
  generationsHidden: PropTypes.bool,
  tasks: PropTypes.object,
};

export default TaskPreviewContainer;
