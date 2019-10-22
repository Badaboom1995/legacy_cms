import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import TextInput from 'components/TextInput/TextInput';
import TextUtilit from 'components/TextUtilit/TextUtilit';

export default class EditWithInputContainer extends React.Component {
  state = {
    editing: false,
    value: '',
  };
  editingOn = () => {
    this.setState(() => ({ editing: true }));
  };
  editingOff = () => {
    const { task, paramName, handleFunction } = this.props;
    this.setState(() => ({ editing: false }));
    const adoptedValue = this.props.getAdoptedValue
      ? this.props.getAdoptedValue(this.state.value)
      : '';
    const finalValue = adoptedValue || this.state.value || this.props.children;
    handleFunction(task.id, {
      [paramName]: finalValue,
    });
  };
  onValueChange = value => {
    this.setState(() => ({ value }));
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
            {TextUtilit.handleText(value)}
            <button onClick={this.editingOn}>edit</button>
          </span>
        )}
      </React.Fragment>
    );
  }
}
