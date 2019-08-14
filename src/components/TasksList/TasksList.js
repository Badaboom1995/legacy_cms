import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TasksPreview from 'components/TaskPreview/TaskPreview';

class TaskPreview extends React.Component {
  render() {
    return (
      <div>
        {this.props.tasks &&
          this.props.tasks.map((item, index) => (
            <TasksPreview generationsHidden key={index} tasks={item} />
          ))}
        {console.log(this.props.tasks)}
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
