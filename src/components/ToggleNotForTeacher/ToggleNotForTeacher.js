import React from 'react';
import { connect } from 'react-redux';
import Tasks from 'helpers/Tasks';
import Checks from 'helpers/Checks';
import { updateTask } from 'actions/tasks';

class ToggleNotForTeacher extends React.Component {
  state = {
    not_for_teacher: undefined,
  };
  toggleNotForTeacher = not_for_teacher => {
    let Request;
    if (this.props.targetType == 'task') {
      Request = new Tasks();
    } else {
      Request = new Checks();
    }

    const toggleTo = not_for_teacher ? false : true;
    Request.updateCheckJob(this.props.target.id, {
      not_for_teacher: toggleTo,
    });
    this.props.dispatch(updateTask(this.props.target.id, 'not_for_teacher', toggleTo));
    this.setState(state => ({
      not_for_teacher: state.not_for_teacher == undefined ? toggleTo : !state.not_for_teacher,
    }));
  };
  render() {
    const flag = this.state.not_for_teacher || this.props.target.not_for_teacher;
    return (
      <button
        onClick={() => {
          this.toggleNotForTeacher(flag);
        }}
      >
        Not for teacher :{' '}
        {(this.state.not_for_teacher != undefined && this.state.not_for_teacher.toString()) ||
          (this.props.target.not_for_teacher
            ? this.props.target.not_for_teacher.toString()
            : 'undefiend')}
      </button>
    );
  }
}

export default connect()(ToggleNotForTeacher);
