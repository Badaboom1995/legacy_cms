import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TasksPreview from 'components/TaskPreview/TaskPreview';
import TasksPreviewFetched from 'components/TaskPreview/TaskPreviewFetched';

class TaskPreview extends React.Component {
  render() {
    return (
      <div>
        {this.props.tasks &&
          this.props.tasks.map((item, index) => (
            <TasksPreviewFetched
              generationsHidden
              key={index}
              task={item}
              generations={item.check_generations}
            />
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
