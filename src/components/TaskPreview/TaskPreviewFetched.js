import React from 'react';
import { connect } from 'react-redux';
import './task-preview.scss';
import PropTypes from 'prop-types';
import { removeGeneration } from 'actions/general';
import TaskPreviewContainer from './TaskPreviewContainer';

class TaskPreviewFetched extends React.Component {
  subjects = { 1: { name: 'Математика' }, 2: { name: 'Русский' } };
  getGenerationsArray = () => {
    const generations = this.props.generations.map(item => {
      let answers = {};
      if (item.data.inputs) {
        answers = this.getInputsAnswers(item);
        console.log(answers);
      } else if (item.data.variants) {
        answers = this.getCommonAnswers(item);
      }

      return {
        id: item.id,
        data: item.data,
        text: item.name,
        kind: item.kind,
        answers: answers.answersNames,
        rightAnswers: answers.rightAnswers,
      };
    });

    return generations;
  };
  getInputsAnswers = item => {
    const answersObject = item.data.inputs;
    let answers = [];
    for (const key in answersObject) {
      answers = [...answers, answersObject[key]];
    }
    let answersNames = answers.map(item => item.question);
    const rightAnswers = [];
    console.log(answersNames);
    return { rightAnswers, answersNames };
  };
  getCommonAnswers = item => {
    const answersObject = item.data.variants;
    let answers = [];
    for (const key in answersObject) {
      answers = [...answers, answersObject[key]];
    }
    let answersNames = answers.map(item => item.name);
    let rightAnswers = answers.reduce((accum, item) => {
      if (item.right) {
        return [...accum, item.name];
      } else {
        return accum;
      }
    }, []);
    return { answersNames, rightAnswers };
  };
  getTaskObject = () => {
    const { chapter_id, difficulty, learning_level, subject, name, id } = this.props.task;
    return {
      chapter: chapter_id,
      difficulty,
      grade: learning_level && learning_level.value,
      subject: this.subjects[subject],
      name,
      id,
    };
  };
  render() {
    const { noDeleteButton, noAddButton } = this.props;
    return (
      <React.Fragment>
        <TaskPreviewContainer
          noDeleteButton={noDeleteButton}
          noAddButton={noAddButton}
          updateTask={'updateTask'}
          generationsHidden
          className={this.props.className}
          task={this.getTaskObject()}
          generations={this.getGenerationsArray()}
          deleteGeneration={removeGeneration}
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
