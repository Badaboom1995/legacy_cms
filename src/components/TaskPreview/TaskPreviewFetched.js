import React from 'react';
import { connect } from 'react-redux';
import { removeGeneration } from 'actions/general';
import './task-preview.scss';
import PropTypes from 'prop-types';
import TaskPreviewContainer from './TaskPreviewContainer';

class TaskPreviewFetched extends React.Component {
  subjects = { 1: { name: 'Математика' }, 2: { name: 'Русский' } };
  getGenerationsArray = () => {
    const generations = this.props.generations.map();
    return generations;
  };
  getTaskObject = () => {
    const { chapter_id, difficulty, learning_level, subject, name } = this.props.task;
    console.log('subject_id', subject);
    return {
      chapter: chapter_id,
      difficulty,
      grade: learning_level.value,
      subject: this.subjects[subject],
      name,
    };
  };
  render() {
    return (
      <React.Fragment>
        <TaskPreviewContainer
          className={this.props.className}
          task={this.getTaskObject()}
          generations={this.props.generations}
        />
      </React.Fragment>
    );
  }
}

TaskPreviewFetched.propTypes = {
  generationsHidden: PropTypes.bool,
  tasks: PropTypes.object,
  generations: PropTypes.array,
};

export default connect()(TaskPreviewFetched);
