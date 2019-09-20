import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Button from 'components/Button/Button';
import { deleteChecks, getChecks, selectCheck, updateSelectedCheck } from 'actions/checks';
import TaskPreviewFetched from 'components/TaskPreview/TaskPreviewFetched';
import SelectElement from 'components/SelectElement/SelectElement';
import Checks from 'helpers/Checks';
import { addCheckOption, saveSelectedCheck } from 'actions/checks';
import SuccessAnimation from 'components/SuccessAnimation/SuccessAnimation';
import {
  levelsNamesSelector,
  levelsSelector,
  subjectsSelector,
  subjectsNamesSelector,
  scalesSelector,
  scalesNamesSelector,
  checkModesSelector,
  checkModesNamesSelector,
} from 'reducers/general';
import { getNameById, getGradeValueById, getSubjectValueById } from 'helpers/getters';
import './tests-list.scss';

class TestsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getChecks());
  }
  deleteCheck = id => {
    this.props.dispatch(deleteChecks(id));
  };
  selectTest = id => {
    this.props.dispatch(selectCheck(id));
  };
  updateCheck = (id, changes) => {
    console.log('id:', id);
    console.log('check:', changes);
    this.props.dispatch(saveSelectedCheck(id, changes));
  };
  onCheckChange = (value, name) => {
    let updatedCheck = { ...this.props.selectedCheck };
    updatedCheck[name] = value;
    this.props.dispatch(updateSelectedCheck(updatedCheck));
  };
  onGradeChange = (value, name) => {
    const subjectObj = this.props.learning_levels.find(item => item.value == value);
    this.onCheckChange(subjectObj.id, name);
  };
  onSubjectChange = (value, name) => {
    const gradeObj = this.props.subjects.find(item => item.name == value);
    this.onCheckChange(gradeObj.id, name);
  };
  onScaleChange = (value, name) => {
    const scaleObj = this.props.scales.find(item => item.name == value);
    this.onCheckChange(scaleObj.id, name);
  };
  onCheckModeChange = (value, name) => {
    const checkModeObj = this.props.checkModes.find(item => item.name == value);
    this.onCheckChange(checkModeObj.id, name);
  };
  onTopicChange = (name, value) => {
    const topicObj = this.props.topics.find(item => item.name == value);
    this.onCheckChange(topicObj.id, 'topic_id');
    this.props.dispatch(addCheckOption(name, value));
  };
  onChapterChange = (name, value) => {
    const chapterObj = this.props.chapters.find(item => item.name == value);
    this.onCheckChange(chapterObj.id, 'chapter_id');
    this.props.dispatch(addCheckOption(name, value));
  };
  deleteTask = id => {
    let updatedCheck = { ...this.props.selectedCheck };
    const updatedTasks = updatedCheck.check_jobs.filter(item => item.id != id);
    updatedCheck.check_jobs = updatedTasks;
    this.onCheckChange(updatedTasks, 'check_jobs');
  };
  render() {
    const { checks_list } = this.props.checks;
    const {
      selectedCheckName,
      selectedCheck,
      learning_levels,
      subjectsNames,
      subjects,
      scales,
      scalesNames,
      checkModes,
      checkModesNames,
      chapterId,
      chapters,
      topics,
      topicId,
      time_limit,
      selectedCheckId,
    } = this.props;
    return (
      <div className="content">
        <div className="tests-list">
          <p className="tests-list__title">Тесты</p>
          {checks_list.map((item, index) => {
            const { check_mode, check_scale } = item;
            return (
              <div
                onClick={() => this.selectTest(item.id)}
                key={index}
                className={`task-preview task-preview__main tests-list__test ${selectedCheckId ==
                  item.id && 'task-preview__main--selected'}`}
              >
                <p className="tests-list__test-title">{item.name}</p>
                <span className="task-preview__param">{check_mode && check_mode.name}</span>
                <span className="task-preview__param">{check_scale && check_scale.name}</span>
                <button
                  onClick={() => {
                    this.deleteCheck(item.id);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
        <div className={`content__secondary ${!selectedCheck && 'content__secondary--disabled'}`}>
          <TextInput
            name="name"
            onChange={this.onCheckChange}
            className="text-input--pretending"
            value={selectedCheckName}
          />
          <TextInput name="time_limit" onChange={this.onCheckChange} value={time_limit} />
          <Select
            name="learning_level_id"
            modificators="select--in-row"
            options={this.props.learning_levels_names}
            onChange={this.onGradeChange}
            label="Класс"
            value={getGradeValueById(selectedCheck.learning_level_id, learning_levels)}
          />
          <Select
            name="subject"
            modificators="select--in-row"
            options={subjectsNames}
            onChange={this.onSubjectChange}
            label="Предмет"
            value={getSubjectValueById(selectedCheck.subject, subjects)}
          />
          <Select
            name="check_scale_id"
            modificators="select--in-row"
            options={scalesNames}
            onChange={this.onScaleChange}
            label="Сложность"
            value={getNameById(selectedCheck.check_scale_id, scales)}
          />
          <Select
            name="check_mode_id"
            modificators="select--in-row"
            options={checkModesNames}
            onChange={this.onCheckModeChange}
            label="Тип"
            value={getNameById(selectedCheck.check_mode_id, checkModes)}
          />
          <SelectElement
            reduxStore="checks"
            type="topicForUpdate"
            name={getNameById(topicId, topics) || 'Раздел'}
            elements={this.props.general.topicsNames}
            chooseElement={this.onTopicChange}
          />
          <SelectElement
            reduxStore="checks"
            type="chapterForUpdate"
            name={getNameById(chapterId, chapters) || 'Тема'}
            elements={this.props.general.chaptersNames}
            chooseElement={this.onChapterChange}
          />
          {/* <SuccessAnimation /> */}
          <div className="create-test create-test--preview tests-list__generations">
            {this.props.selectedCheckTasks.map((item, index) => {
              return (
                <TaskPreviewFetched
                  noAddButton
                  generationsHidden
                  key={index}
                  task={item}
                  generations={item.check_generations}
                  deleteTask={this.deleteTask}
                />
              );
            })}
          </div>
          <div className="content__secondary-submit">
            <Button
              className="button--upload button--full-width"
              onClick={() => {
                this.updateCheck(selectedCheck.id, selectedCheck);
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

TestsList.propTypes = {
  name: PropTypes.string,
};

const mapStateToProps = state => ({
  general: state.general,
  checks: state.checks,
  selectedCheck: state.checks.selectedCheck,
  selectedCheckId: state.checks.selectedCheck.id,
  selectedCheckName: Object.keys(state.checks.selectedCheck).length
    ? state.checks.selectedCheck.name
    : 'Название теста',
  time_limit: state.checks.selectedCheck.time_limit || '',
  selectedCheckTasks: state.checks.selectedCheck.check_jobs || [],
  learning_levels_names: levelsNamesSelector(state),
  learning_levels: levelsSelector(state),
  subjects: subjectsSelector(state),
  subjectsNames: subjectsNamesSelector(state),
  scales: scalesSelector(state),
  scalesNames: scalesNamesSelector(state),
  checkModes: checkModesSelector(state),
  checkModesNames: checkModesNamesSelector(state),
  chapterId: state.checks.selectedCheck.chapter_id,
  chapters: state.general.chapters,
  topicId: state.checks.selectedCheck.topic_id,
  topics: state.general.topics,
});

export default connect(mapStateToProps)(TestsList);
