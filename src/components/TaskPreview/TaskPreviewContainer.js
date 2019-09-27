import React from 'react';
import { connect } from 'react-redux';
import './task-preview.scss';
import PropTypes from 'prop-types';
import { addTaskToTest } from 'actions/checks';
import TextUtilit from 'components/TextUtilit/TextUtilit';
import EditableWithInput from 'components/EditableField/EditableWithInput';
import EditableWithSelect from 'components/EditableField/EditableWithSelect';

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
          <EditableWithInput
            task={this.props.task}
            paramName="name"
            className="task-preview__title"
          >
            {TextUtilit.handleText(name) || 'Название'}
          </EditableWithInput>
          <EditableWithSelect
            task={this.props.task}
            options={[]}
            parseFunction={() => {}}
            propName="chapter_id"
            className="task-preview__subtitle"
          >
            {chapter}
          </EditableWithSelect>
          {console.log(this.props.general.scales)}
          <EditableWithSelect
            task={this.props.task}
            label="Сложность"
            options={this.props.general.scales}
            getNames={array => array.map(item => item.name)}
            getId={(array, value) => array.find(item => item.name == value)}
            paramName="difficulty"
            className="task-preview__param"
          >
            {difficulty || 'Cложность'}
          </EditableWithSelect>
          {console.log(this.props.task)}
          <EditableWithSelect
            task={this.props.task}
            label="Класс"
            options={this.props.general.learning_levels}
            getNames={array => array.map(item => item.name)}
            getId={(array, value) => array.find(item => item.name == value)}
            paramName="learning_level_id"
            className="task-preview__param"
          >
            {grade ? `${grade} класс` : 'Класс'}
          </EditableWithSelect>
          <EditableWithSelect
            task={this.props.task}
            label="Предмет"
            options={this.props.general.subjects}
            getNames={array => array.map(item => item.name)}
            getId={(array, value) => array.find(item => item.name == value)}
            paramName="subject"
            className="task-preview__param"
          >
            {(subject && subject.name) || 'Предмет'}
          </EditableWithSelect>
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

const mapStateToProps = state => ({
  general: state.general,
  checks: state.checks,
});

export default connect(mapStateToProps)(TaskPreviewContainer);
