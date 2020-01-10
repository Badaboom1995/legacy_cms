import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import TextArea from 'components/TextArea/TextArea';
import TextUtilit from 'utilits/TextUtilit/TextUtilit';
import DataCreator from 'utilits/DataCreator/DataCreator';
import { updateTask } from 'actions/tasks';

class EditWithInputContainer extends React.Component {
  constructor(props) {
    super(props);

    const { children } = props;
    this.state = {
      editing: false,
      value: TextUtilit.convertTextToB2t(children),
      isValid: true,
    };
  }

  editingOn = () => {
    this.setState(() => ({ editing: true }));
  };
  editingOff = () => {
    const { task, paramName, handleFunction, task_id } = this.props;
    const adoptedValue = this.props.getAdoptedValue
      ? this.props.getAdoptedValue(this.state.value)
      : this.state.value;
    // Фикс для редактирования нескольких ответов сразу
    if (this.props.paramName == 'data') {
      const task = this.props.tasks.taskList.find(item => item.id == this.props.task_id);
      const generation = task && task.check_generations.find(item => item.id == this.props.task.id);
      const newGeneration = { ...generation, data: adoptedValue };
      const editedCheckGenerations =
        task &&
        task.check_generations.map(item => {
          return item.id == newGeneration.id ? newGeneration : item;
        });
      this.props.dispatch(updateTask(task_id, 'check_generations', editedCheckGenerations));
    }
    // fix end
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
    const { className, task, paramName } = this.props;
    const { value, editing, isValid } = this.state;

    return (
      <React.Fragment>
        {editing ? (
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
        {editing && !isValid && paramName === 'data' && (
          <div className="expression-warning">
            {`Ожидаемое выражение: ${DataCreator.getWarningText(task.kind)}`}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
  };
};

export default connect(mapStateToProps)(EditWithInputContainer);
