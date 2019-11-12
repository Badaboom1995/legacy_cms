import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import Button from 'components/Button/Button';
import { deleteChecks, getChecks, getChecksPart, selectCheck, updateSelectedCheck } from 'actions/checks';
import TaskPreviewFetched from 'components/TaskPreview/TaskPreviewFetched';
import SelectElement from 'components/SelectElement/SelectElement';
import Tasks from 'helpers/Tasks';
import { addCheckOption, saveSelectedCheck } from 'actions/checks';
import Tabs from 'components/Tabs/Tabs';
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

const CHECKS_LIMIT = 20;
const defaultParams = {
  sort: 'id+desc',
  limit: CHECKS_LIMIT,
};

class TestsList extends React.Component {
  state = {
    activeSubject: '1',
    checksOffset: 0,
    checksFetching: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { activeSubject } = this.state;
    const params = {
      ...defaultParams,
      filters: {
        subject: activeSubject,
      },
    };
    dispatch(getChecks(params));
  }

  componentDidUpdate(prevProps) {
    const { checks } = this.props;
    if (prevProps.checks.checks_list
      && checks.checks_list
      && prevProps.checks.checks_list.length !== checks.checks_list.length
    ) {
      this.setState({ checksFetching: false });
    }
  }

  selectSubject = subjectId => {
    const params = {
      ...defaultParams,
      filters: {
        subject: subjectId,
      },
    };
    this.props.dispatch(getChecks(params));
    this.setState(() => ({ activeSubject: subjectId, checksOffset: 0 }));
  };
  deleteCheck = id => {
    this.props.dispatch(deleteChecks(id));
  };
  selectTest = id => {
    this.props.dispatch(selectCheck(id));
  };
  updateCheck = (id, changes) => {
    this.props.dispatch(saveSelectedCheck(id, changes));
  };
  onCheckChange = (value, name) => {
    let updatedCheck = { ...this.props.selectedCheck };
    updatedCheck[name] = value;
    this.props.dispatch(updateSelectedCheck(updatedCheck));
  };
  onChange = (value, name, toFunction) => {
    const Obj = this.props[toFunction.searchIn].find(item => item[toFunction.propName] == value);
    this.onCheckChange(Obj.id, name);
    if (toFunction.dispatch) {
      this.props.dispatch(toFunction.dispatch(name, value));
    }
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
  updateTask = () => {
    const Request = new Tasks();
    Request.updateCheckJob();
  };
  buttonRequestHandler = () => {
    const { dispatch } = this.props;
    const { checksOffset, activeSubject } = this.state;
    const newOffset = checksOffset + CHECKS_LIMIT;

    const params = {
      ...defaultParams,
      offset: newOffset,
      filters: {
        subject: activeSubject,
      },
    };
    dispatch(getChecksPart(params));
    this.setState({ checksOffset: newOffset, checksFetching: true });
  };

  render() {
    const {
      checks: {
        checks_list,
      },
    } = this.props;

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
      isAllChecksReceived,
    } = this.props;
    const { checksFetching } = this.state;

    return (
      <div className="content">
        <div className="tests-list">
          <p className="tests-list__title">Тесты</p>
          <Tabs elements={this.props.general.subjects} selectSubject={this.selectSubject} />
          {checks_list.map((item, index) => {
            const { check_mode, check_scale } = item;
            return (
              this.state.activeSubject == item.subject && (
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
              )
            );
          })}
          {isAllChecksReceived
            ? null
            : (
              <Button className={`tests-button__request ${checks_list.length ? '' : 'hidden'}`} onClick={this.buttonRequestHandler}>
              {checksFetching
                ? `Загрузка...`
                : `Показать ещё ${CHECKS_LIMIT}`
              }
              </Button>
            )
          }
        </div>
        <div className={`content__secondary ${!selectedCheck && 'content__secondary--disabled'}`}>
          <TextInput
            name="name"
            onChange={this.onCheckChange}
            className="text-input--pretending"
            value={selectedCheckName}
          />
          <button onClick={this.updateTask}>click</button>
          <TextInput name="time_limit" onChange={this.onCheckChange} value={time_limit} />
          <Select
            name="learning_level_id"
            modificators="select--in-row"
            options={this.props.learning_levels_names}
            onChange={this.onChange}
            toFunction={{ searchIn: 'learning_levels', propName: 'value' }}
            label="Класс"
            value={getGradeValueById(selectedCheck.learning_level_id, learning_levels)}
          />
          <Select
            name="subject"
            modificators="select--in-row"
            options={subjectsNames}
            onChange={this.onChange}
            toFunction={{ searchIn: 'subjects', propName: 'name' }}
            label="Предмет"
            value={getSubjectValueById(selectedCheck.subject, subjects)}
          />
          <Select
            name="check_scale_id"
            modificators="select--in-row"
            options={scalesNames}
            onChange={this.onChange}
            toFunction={{ searchIn: 'scales', propName: 'name' }}
            label="Сложность"
            value={getNameById(selectedCheck.check_scale_id, scales)}
          />
          <Select
            name="check_mode_id"
            modificators="select--in-row"
            options={checkModesNames}
            onChange={this.onChange}
            toFunction={{ searchIn: 'checkModes', propName: 'name' }}
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
          {/* <button onClick={this.updateTask}>update</button> */}
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
  isAllChecksReceived: state.checks.isAllReceived,
});

export default connect(mapStateToProps)(TestsList);
