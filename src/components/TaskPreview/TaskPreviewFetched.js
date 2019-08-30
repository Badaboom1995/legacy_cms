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
      console.log(rightAnswers);
      // const answers = Object.keys(answersObj).map(item => {
      //   return answersObj[item].name;
      // });
      // let rightAnswers = [];
      // for (let prop in answersObj) {
      //   if (answersObj[prop].right) {
      //     rightAnswers = [...rightAnswers, answersObj[prop].name];
      //   }
      // }
      return {
        text: item.name,
        kind: item.kind,
        answers: answersNames,
        rightAnswers,
      };
    });

    return generations;
  };
  getTaskObject = () => {
    const { chapter_id, difficulty, learning_level, subject, name, id } = this.props.task;
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
          generationsHidden
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
