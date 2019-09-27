import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import Tasks from 'helpers/Tasks';

class EditableWithInput extends React.Component {
  state = {
    editing: false,
    value: '',
  };
  editingOn = () => {
    this.setState(
      () => ({ editing: true }),
      () => {
        this.text.focus();
      },
    );
  };
  editingOff = () => {
    this.setState(() => ({ editing: false }));
    const Request = new Tasks();
    Request.updateCheckJob(this.props.task.id, { [this.props.paramName]: this.state.value });
  };
  onValueChange = () => {
    this.setState(() => ({ value: this.text.value }));
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
              value={this.state.value || this.props.children}
              ref={text => (this.text = text)}
              onChange={this.onValueChange}
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

export default connect()(EditableWithInput);
