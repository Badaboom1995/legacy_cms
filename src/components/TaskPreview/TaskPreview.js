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
    if (['variant', 'variants', 'variants_all'].includes(kind)) {
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
            console.log(exp);
            return (
              <li className={`task-preview__generation-answer`} key={index}>
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
    const { chapter, difficulty, grade, subject, name } = this.props.tasks || {};
    return (
      <React.Fragment>
        <TaskPreviewContainer
          className={this.props.className}
          task={this.props.task}
          generations={this.props.generations}
          deleteGeneration={this.deleteGeneration}
          generationsHidden={generationsHidden}
        />
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
