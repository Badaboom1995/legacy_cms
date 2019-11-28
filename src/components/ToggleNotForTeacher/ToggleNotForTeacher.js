import React from 'react';
import { connect } from 'react-redux';
import Tasks from 'helpers/Tasks';
import { updateTask } from 'actions/tasks';

class ToggleNotForTeacher extends React.Component {
  state = {
    not_for_teacher: undefined,
  };
  toggleNotForTeacher = not_for_teacher => {
    const Request = new Tasks();
    const toggleTo = not_for_teacher ? false : true;
    Request.updateCheckJob(this.props.task.id, {
      not_for_teacher: toggleTo,
    });
    this.props.dispatch(updateTask(this.props.task.id, 'not_for_teacher', toggleTo));
    this.setState(state => ({
      not_for_teacher: state.not_for_teacher == undefined ? toggleTo : !state.not_for_teacher,
    }));
  };
  render() {
    const flag = this.state.not_for_teacher || this.props.task.not_for_teacher;
    return (
      <button
        onClick={() => {
          this.toggleNotForTeacher(flag);
        }}
      >
        Not for teacher :{' '}
        {(this.state.not_for_teacher != undefined && this.state.not_for_teacher.toString()) ||
          this.props.task.not_for_teacher.toString()}
      </button>
    );
  }
}

export default connect()(ToggleNotForTeacher);
