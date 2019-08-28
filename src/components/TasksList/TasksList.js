import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TasksPreviewFetched from 'components/TaskPreview/TaskPreviewFetched';
import Tasks from 'helpers/Tasks';
import { deleteTask } from 'actions/tasks';

class TaskPreview extends React.Component {
  deleteTask = id => {
    this.props.dispatch(deleteTask(id));
    const Request = new Tasks();
    Request.deleteTask(id);
  };
  render() {
    const filteredTasks =
      this.props.tasks &&
      this.props.tasks.filter(item => {
        return item.base;
      });
    return (
      <div>
        {this.props.tasks &&
          filteredTasks.map((item, index) => (
            <TasksPreviewFetched
              generationsHidden
              key={index}
              task={item}
              generations={item.check_generations}
              deleteTask={this.deleteTask}
            />
          ))}
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
