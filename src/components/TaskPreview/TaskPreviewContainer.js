import React from 'react';
import { removeGeneration } from 'actions/general';
import { connect } from 'react-redux';
import './task-preview.scss';
import PropTypes from 'prop-types';
import { addTaskToTest } from 'actions/checks';
import TextUtilit from 'components/TextUtilit/TextUtilit';
import EditableElement from 'components/EditableElement/EditableElement';

class TaskPreviewContainer extends React.Component {
  state = {
    showGens: this.props.generationsHidden ? false : true,
  };
  toggleGens = () => {
    this.setState(state => ({
      showGens: state.showGens ? false : true,
    }));
  };
  render() {
    const { generationsHidden, noDeleteButton, noAddButton } = this.props;
    const { chapter, difficulty, grade, subject, name, id } = this.props.task;
    const showGens = (generationsHidden && this.state.showGens) || !generationsHidden;
    return (
      <div key={this.props.key} className={`${this.props.className} task-preview `}>
        <div className="task-preview__main">
          <EditableElement className="task-preview__title">
            {TextUtilit.handleText(name) || 'Название'}
          </EditableElement>
          <EditableElement className="task-preview__subtitle">{chapter}</EditableElement>
          <EditableElement className="task-preview__param">
            {difficulty || 'Cложность'}
          </EditableElement>
          <EditableElement className="task-preview__param">
            {grade ? `${grade} класс` : 'Класс'}
          </EditableElement>
          <EditableElement className="task-preview__param">
            {(subject && subject.name) || 'Предмет'}
          </EditableElement>
          {!noDeleteButton && (
            <button
              onClick={() => {
                this.props.deleteTask(id);
              }}
            >
              Удалить задание
            </button>
          )}
          {generationsHidden && <button onClick={this.toggleGens}>Показать генерации</button>}
          {!noAddButton && (
            <button
              onClick={() => {
                this.props.dispatch(
                  addTaskToTest({ task: this.props.task, generations: this.props.generations }),
                );
              }}
            >
              Добавить задание в тест
            </button>
          )}
        </div>

        <div>
          {showGens &&
            this.props.generations.map((generation, index) => {
              const answers = generation.answers || generation.expressions || [];
              return (
                <div className="task-preview__main task-preview__main--generation" key={index}>
                  <h3 className="task-preview__title">{TextUtilit.handleText(generation.text)}</h3>
                  <span className="task-preview__subtitle">{generation.kind}</span>
                  <ul className="task-preview__generations">
                    {answers.map((answer, index) => {
                      return (
                        <li
                          className={`task-preview__generation-answer
                        ${generation.rightAnswers &&
                          generation.rightAnswers.includes(answer) &&
                          'task-preview__generation-answer--right'}`}
                          key={index}
                        >
                          {TextUtilit.handleText(generation.rightAnswers ? answer : answer.value)}
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    onClick={() => {
                      this.props.deleteGeneration(index);
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

export default connect()(TaskPreviewContainer);
