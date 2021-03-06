import React from 'react';
import './editable-element.scss';
import TextArea from 'components/TextArea/TextArea';
import TextUtilit from 'utilits/TextUtilit/TextUtilit';

export default class EditWithInputContainer extends React.Component {
  state = {
    editing: false,
    value: '',
  };
  editingOn = () => {
    this.setState(() => ({ editing: true }));
  };
  editingOff = () => {
    const { task, param_name, handleFunction } = this.props;
    this.setState(() => ({ editing: false }));
    const adoptedValue = this.props.getAdoptedValue
      ? this.props.getAdoptedValue(this.state.value)
      : '';
    const finalValue = adoptedValue || this.state.value || this.props.children;
    handleFunction(task.id, {
      [param_name]: finalValue,
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
            <TextArea
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
