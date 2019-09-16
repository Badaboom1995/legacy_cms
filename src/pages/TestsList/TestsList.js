import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInput from 'components/TextInput/TextInput';
import Select from 'components/Select/Select';
import { deleteChecks, getChecks, selectCheck, updateSelectedCheck } from 'actions/checks';
import TaskPreviewFetched from 'components/TaskPreview/TaskPreviewFetched';
import Checks from 'helpers/Checks';
import './tests-list.scss';

class TestsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(getChecks());
    console.log(this.props.checks.checks_list);
  }

  deleteCheck = id => {
    this.props.dispatch(deleteChecks(id));
  };
  selectTest = id => {
    this.props.dispatch(selectCheck(id));
  };
  updateCheck = (id, changes) => {
    const Request = new Checks();
    Request.updateCheck(id, changes);
  };
  onCheckChange = (value, name) => {
    let updatedCheck = { ...this.props.selectedCheck };
    updatedCheck[name] = value;
    this.props.dispatch(updateSelectedCheck(updatedCheck));
    console.log(updatedCheck);
  };
  render() {
    const { checks_list } = this.props.checks;
    const { selectedCheckName } = this.props;
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
                className="task-preview task-preview__main tests-list__test"
              >
                <p
                  className="tests-list__test-title"
                  onClick={() => {
                    this.updateCheck(this.props.checks.selectedCheck.id, { name: 'yoyoyo1' });
                  }}
                >
                  {item.name}
                </p>
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
        <div className="content__secondary">
          <TextInput
            name="name"
            onChange={this.onCheckChange}
            className="text-input--pretending"
            value={selectedCheckName}
          />
          <Select
            name="grade"
            modificators="select--in-row"
            options={[]}
            onChange={this.onCheckChange}
            label="Класс"
          />
          <div className="create-test create-test--preview">
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
  selectedCheckName: Object.keys(state.checks.selectedCheck).length
    ? state.checks.selectedCheck.name
    : 'Название теста',
  selectedCheckTasks: state.checks.selectedCheck.check_jobs || [],
  learning_levels: state.general.learning_levels,
});

export default connect(mapStateToProps)(TestsList);
