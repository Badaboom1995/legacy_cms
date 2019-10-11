import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TasksPreviewFetched from 'components/TaskPreview/TaskPreviewFetched';
import Tasks from 'helpers/Tasks';
import Tabs from 'components/Tabs/Tabs';
import { deleteTask } from 'actions/tasks';

class TaskPreview extends React.Component {
  state = {
    activeSubject: '1',
  };
  deleteTask = id => {
    this.props.dispatch(deleteTask(id));
    const Request = new Tasks();
    Request.deleteTask(id);
  };
  selectSubject = subjectId => {
    this.setState(() => ({ activeSubject: subjectId }));
  };
  render() {
    const filteredTasks =
      this.props.tasks &&
      this.props.tasks.filter(item => {
        return item.base;
      });
    return (
      <div>
        <Tabs elements={this.props.general.subjects} selectSubject={this.selectSubject} />
        {this.props.tasks &&
          filteredTasks.reverse().map((item, index) => {
            return (
              item.subject == this.state.activeSubject && (
                <TasksPreviewFetched
                  generationsHidden
                  key={index}
                  task={item}
                  generations={item.check_generations}
                  deleteTask={this.deleteTask}
                />
              )
            );
          })}
      </div>
    );
  }
}

TaskPreview.propTypes = {
  name: PropTypes.string,
};

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(TaskPreview);
