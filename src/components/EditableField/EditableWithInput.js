import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import TextArea from 'components/TextArea/TextArea';
import TextUtilit from 'utilits/TextUtilit/TextUtilit';
import DataCreator from 'utilits/DataCreator/DataCreator';

export default class EditWithInputContainer extends React.Component {
  constructor(props) {
    super(props);

    const { children } = props;
    this.state = {
      editing: false,
      value: TextUtilit.unhandleText(children),
      isValid: true,
    };
  }

  editingOn = () => {
    this.setState(() => ({ editing: true }));
  };
  editingOff = () => {
    const { task, paramName, handleFunction } = this.props;
    console.log(task);

    const adoptedValue = this.props.getAdoptedValue
      ? this.props.getAdoptedValue(this.state.value)
      : this.state.value;

    if (!adoptedValue) {
      this.setState({ isValid: false });
    } else {
      this.setState({ editing: false, isValid: true });
      const finalValue = adoptedValue || this.props.children;
      handleFunction(task.id, {
        [paramName]: finalValue,
      });
    }
  };
  onValueChange = value => {
    this.setState(() => ({ value }));
  };
  render() {
    const { className, task } = this.props;
    const { value, editing, isValid } = this.state;
    const warningText = DataCreator.getWarningText(task.kind);

    return (
      <React.Fragment>
        {editing
        ? (
          <div className="editable-element editable-element--input">
            <TextArea
              className="editable-element__input"
              name="answerToAdd"
              value={value}
              onChange={this.onValueChange}
            />
            <button onClick={this.editingOff}>submit</button>
          </div>
        )
        : (
          <span onClick={this.editingOn} className={className}>
            {TextUtilit.handleText(value)}
            <button onClick={this.editingOn}>edit</button>
          </span>
        )}
        {(editing && !isValid) && (
          <div className="expression-warning">
            {`Ожидаемое выражение: ${warningText}`}
          </div>
        )}
      </React.Fragment>
    );
  }
}
