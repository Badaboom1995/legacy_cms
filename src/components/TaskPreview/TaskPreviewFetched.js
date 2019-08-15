import React from 'react';
import { connect } from 'react-redux';
import { removeGeneration } from 'actions/general';
import './task-preview.scss';
import PropTypes from 'prop-types';
import TaskPreviewContainer from './TaskPreviewContainer';

class TaskPreviewFetched extends React.Component {
  subjects = { 1: { name: 'Математика' }, 2: { name: 'Русский' } };
  componentDidMount = () => {};
  getGenerationsArray = () => {
    const generations = this.props.generations.map(item => {
      const answersKey = Object.keys(item.data);
      const answersObj = item.data[answersKey[0]];
      const answers = Object.keys(answersObj).map(item => {
        return answersObj[item].name;
      });
      let rightAnswers = [];
      for (let prop in answersObj) {
        if (answersObj[prop].right) {
          rightAnswers = [...rightAnswers, answersObj[prop].name];
        }
      }
      return {
        text: item.name,
        kind: item.kind,
        answers,
        rightAnswers,
      };
    });
    return generations;
  };
  getTaskObject = () => {
    const { chapter_id, difficulty, learning_level, subject, name, id } = this.props.task;
    console.log('subject_id', subject);
    return {
      chapter: chapter_id,
      difficulty,
      grade: learning_level.value,
      subject: this.subjects[subject],
      name,
      id,
    };
  };
  render() {
    return (
      <React.Fragment>
        <TaskPreviewContainer
          className={this.props.className}
          task={this.getTaskObject()}
          generations={this.getGenerationsArray()}
          deleteTask={this.props.deleteTask}
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
