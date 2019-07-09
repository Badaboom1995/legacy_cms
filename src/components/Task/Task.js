import React, { Component } from 'react';
import { connect } from 'react-redux';

class Task extends Component {
  render() {
    return (
      <div className="task">
        <h3>{this.props.title}</h3>
        <h3>{this.props.taskName}</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  general: state.general,
});

export default connect(mapStateToProps)(Task);
