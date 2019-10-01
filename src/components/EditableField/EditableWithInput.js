import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import Tasks from 'helpers/Tasks';
import './editable-element.scss';
import TextInput from 'components/TextInput/TextInput';

class EditableWithInput extends React.Component {
  state = {
    editing: false,
    value: '',
  };
  editingOn = () => {
    this.setState(() => ({ editing: true }));
  };
  editingOff = () => {
    this.setState(() => ({ editing: false }));
    this.props.handleFunction(this.props.task.id, { [this.props.param_name]: this.state.value });
  };
  onValueChange = value => {
    this.setState(() => ({ value: value }));
  };
  render() {
    const { className } = this.props;
    const value = this.state.value || this.props.children;
    return (
      <React.Fragment>
        {this.state.editing ? (
          <div className="editable-element">
            <TextInput name="answerToAdd" value={value} onChange={this.onValueChange} mathMode />
            <button onClick={this.editingOff}>submit</button>
          </div>
        ) : (
          <span onClick={this.editingOn} className={className}>
            {value}
          </span>
        )}
      </React.Fragment>
    );
  }
}

export default connect()(EditableWithInput);
