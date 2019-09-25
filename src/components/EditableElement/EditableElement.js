import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import PropTypes from 'prop-types';

class EditableElement extends React.Component {
  state = {
    editing: false,
  };
  editingOn = () => {
    this.setState(() => ({ editing: true }));
  };
  editingOff = () => {
    this.setState(() => ({ editing: false }));
  };
  render() {
    const { className } = this.props;
    return (
      <React.Fragment>
        {this.state.editing ? (
          <div className="editable-element">
            <input
              className="editableElement__input"
              type="text"
              value={this.props.children}
              onChange={this.editingOff}
            />{' '}
            <button onClick={this.editingOff}>submit</button>
          </div>
        ) : (
          <span onClick={this.editingOn} className={className}>
            {this.props.children}
          </span>
        )}
      </React.Fragment>
    );
  }
}

EditableElement.propTypes = {
  generationsHidden: PropTypes.bool,
  tasks: PropTypes.object,
  generations: PropTypes.array,
};

export default connect()(EditableElement);
