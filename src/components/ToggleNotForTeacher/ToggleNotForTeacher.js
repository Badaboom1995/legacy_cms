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
    const toggleTo = not_for_teacher ? false : true;
    const changes = { not_for_teacher: toggleTo };
    if (this.props.targetType == 'task') {
      const Request = new Tasks();
      Request.updateCheckJob(this.props.target.id, changes);
    } else {
      const Request = new Checks();
      this.props.updateCheck(this.props.target.id, {
        ...this.props.target,
        not_for_teacher: toggleTo,
      });
      console.log(this.props.target.id, { ...this.props.target, not_for_teacher: toggleTo });
      const newTest = { ...this.props.target, not_for_teacher: toggleTo };
      Request.updateCheck(this.props.target.id, newTest);
    }
    this.setState(state => ({
      not_for_teacher: state.not_for_teacher == undefined ? toggleTo : !state.not_for_teacher,
    }));
  };
  render() {
    const flag =
      this.state.not_for_teacher == undefined
        ? this.props.target.not_for_teacher
        : this.state.not_for_teacher;
    return (
      <button
        onClick={() => {
          this.toggleNotForTeacher(flag);
        }}
      >
        Not for teacher :{' '}
        {(this.state.not_for_teacher != undefined && this.state.not_for_teacher.toString()) ||
          (this.props.target.not_for_teacher != undefined
            ? this.props.target.not_for_teacher.toString()
            : 'undefiend')}
      </button>
    );
  }
}

export default connect()(ToggleNotForTeacher);
