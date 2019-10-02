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
    if (this.props.prefix) {
      value = {
        [this.props.prefix]: {
          ...this.props.task[this.props.param_name][this.props.prefix],
          [String.fromCharCode(this.props.index + 97)]: {
            ...this.props.task[this.props.param_name][this.props.prefix][
              String.fromCharCode(this.props.index + 97)
            ],
            value: this.state.value,
            name: this.state.value,
          },
        },
      };
    }
    console.log(value);
    this.setState(() => ({ editing: false }));
    this.props.handleFunction(this.props.task.id, {
      [this.props.param_name]: value || this.state.value,
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
