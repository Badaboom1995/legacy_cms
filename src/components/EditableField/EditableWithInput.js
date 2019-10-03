import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
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
    let value = '';
    const ALPHABET_START_CODE = 97;
    const { prefix, task, param_name, index, handleFunction } = this.props;
    const answerLetter = String.fromCharCode(ALPHABET_START_CODE + index);

    if (prefix) {
      value = {
        [prefix]: {
          ...task[param_name][prefix],
          [answerLetter]: {
            ...task[param_name][prefix][answerLetter],
            value: this.state.value || this.props.children,
            name: this.state.value || this.props.children,
          },
        },
      };
    }

    this.setState(() => ({ editing: false }));
    handleFunction(task.id, {
      [param_name]: value || this.state.value || this.props.children,
    });
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
          <div className="editable-element editable-element--input">
            <TextInput
              className="editable-element__input"
              name="answerToAdd"
              value={value}
              onChange={this.onValueChange}
            />
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
