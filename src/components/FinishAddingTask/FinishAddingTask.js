import React from 'react';
import { connect } from 'react-redux';
import './generations.scss';
import { removeGeneration } from 'actions/general';
import TaskPreview from 'components/TaskPreview/TaskPreview';

class FinishAddingTask extends React.Component {
  deleteGeneration = index => {
    this.props.dispatch(removeGeneration(index));
  };
  render() {
    return <TaskPreview generationsHidden tasks={this.props.tasks} />;
  }
}

const mapStateToProps = state => ({
  general: state.general,
  tasks: state.tasks,
});

export default connect(mapStateToProps)(FinishAddingTask);
