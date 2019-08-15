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
    return <TaskPreview task={this.props.tasks} generations={this.props.general.generations} />;
  }
}

const mapStateToProps = state => ({
  general: state.general,
  tasks: state.tasks,
});

export default connect(mapStateToProps)(FinishAddingTask);
