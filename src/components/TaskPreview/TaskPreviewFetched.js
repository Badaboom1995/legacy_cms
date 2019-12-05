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
      } else if (item.data.dropdown) {
        answers = this.getDropdownAnswers(item);
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
        answersType: answers.answersType,
        images: item.images,
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
  handleDropdownAnswer = (answers, question) => {
    let editableQuestion = question;
    for (const key in answers) {
      const dropdown = answers[key];
      const dropdownValue = dropdown.values
        .join('|')
        .replace(dropdown.expected, `${dropdown.expected}*`);
      editableQuestion = editableQuestion.replace(
        `%{${key}}`,
        `dr${dropdown.type && dropdown.type.substr(0, 1)}(${dropdownValue})`,
      );
    }
    return editableQuestion;
  };
  getInputsAnswers = item => {
    const answersObject = item.data.inputs;
    let answers = [];
    for (const key in answersObject) {
      answers = [...answers, answersObject[key]];
    }
    let answersType = answers.map(item => item.right);
    let answersNames = answers.map(item => this.handleInputAnswer(item.answers, item.question));

    const rightAnswers = [];
    return { rightAnswers, answersNames, answersType };
  };
  getDropdownAnswers = item => {
    const answersObject = item.data.dropdown;
    let answers = [];
    for (const key in answersObject) {
      answers = [...answers, answersObject[key]];
    }
    let answersType = answers.map(item => item.right);
    let answersNames = answers.map(item => this.handleDropdownAnswer(item.answers, item.question));

    const rightAnswers = [];
    return { rightAnswers, answersNames, answersType };
  };
  getCommonAnswers = item => {
    const answersObject = item.data.variants;
    let answers = [];
    for (const key in answersObject) {
      answers = [...answers, answersObject[key]];
    }
    let answersNames = answers.map(item => item.name);
    let answersType = answers.map(item => item.right);
    let rightAnswers = answers.reduce((accum, item) => {
      if (item.right) {
        return [...accum, item.name];
      } else {
        return accum;
      }
    }, []);
    return { answersNames, rightAnswers, answersType };
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
