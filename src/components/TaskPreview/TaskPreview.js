import React from 'react';
import { connect } from 'react-redux';
import { removeGeneration } from 'actions/general';
import './task-preview.scss';
import PropTypes from 'prop-types';
import TaskPreviewContainer from './TaskPreviewContainer';

class TaskPreview extends React.Component {
  deleteGeneration = index => {
    this.props.dispatch(removeGeneration(index));
  };

  renderGeneration = generation => {
    const { kind } = generation;
    let result = '';
    if (['variant', 'variants', 'variants_all'].some(name => name === kind)) {
      result = (
        <ul className="task-preview__generations">
          {generation.answers.map((answer, index) => {
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
          })}
        </ul>
      );
    } else if (kind === 'inputs') {
      result = (
        <ul className="task-preview__generations">
          {generation.expressions.map((exp, index) => {
            return (
              <li
                className={`task-preview__generation-answer`}
                key={index}
              >
                {exp.value}
              </li>
            );
          })}
        </ul>
      );
    }

    return result;
  };

  render() {
    const { generationsHidden } = this.props;
    const { chapter, difficulty, grade, subject, name } = this.props.tasks;
    return (
      <React.Fragment>
        {/* <TaskPreviewContainer
          className={this.props.className}
          task={this.props.task}
          generations={this.props.generations}
        /> */}
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
              this.props.general.generations.map((generation, index) => {

                return (
                  <div className="task-preview__main task-preview__main--generation" key={index}>
                    <h3 className="task-preview__title">{generation.text}</h3>
                    <span className="task-preview__subtitle">{generation.kind}</span>
                    {this.renderGeneration(generation)}
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
      </React.Fragment>
    );
  }
}

TaskPreview.propTypes = {
  generationsHidden: PropTypes.bool,
  tasks: PropTypes.object,
};

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(TaskPreview);
