import React from 'react';
import { connect } from 'react-redux';
import './task-preview.scss';
import PropTypes from 'prop-types';
import { removeGeneration } from 'actions/general';
import TaskPreviewContainer from './TaskPreviewContainer';
import TextUtilit from 'components/TextUtilit/TextUtilit';

class TaskPreviewFetched extends React.Component {
  subjects = { 1: { name: 'Математика' }, 2: { name: 'Русский' } };
  getGenerationsArray = () => {
    const generations = this.props.generations.map(item => {
      let answers = {};
      if (item.data.inputs) {
        answers = this.getInputsAnswers(item);
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
  handleInputAnswer = (answers, question) => {
    let editableQuestion = question;
    for (const key in answers) {
      editableQuestion = editableQuestion.replace(`%{${key}}`, `in(${answers[key]})`);
    }
    return editableQuestion;
  };
  getInputsAnswers = item => {
    const answersObject = item.data.inputs;
    let answers = [];
    for (const key in answersObject) {
      answers = [...answers, answersObject[key]];
    }
    let answersNames = answers.map(item => this.handleInputAnswer(item.answers, item.question));

    const rightAnswers = [];
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
