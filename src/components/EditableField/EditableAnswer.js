import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import EditableWithInput from './EditableWithInput';
import DataCreator from 'utilits/DataCreator/DataCreator';

class EditableAnswer extends React.Component {
  state = {
    editing: false,
    value: '',
  };

  getAdoptedValue = value => {
    let adoptedValue = '';
    const ALPHABET_START_CODE = 97;
    const { task, paramName, index, handleFunction } = this.props;
    const answerLetter = String.fromCharCode(ALPHABET_START_CODE + index);
    if (task.kind == 'inputs' || task.kind == 'dropdown') {
      const data = DataCreator.createData(value, task.kind);
      if (!data) return false;

      adoptedValue = {
        [task.kind]: {
          ...task[paramName][task.kind],
          [answerLetter]: data,
        },
      };
    } else if (/^variant/.test(task.kind)) {
      adoptedValue = {
        variants: {
          ...task[paramName].variants,
          [answerLetter]: {
            ...task[paramName].variants[answerLetter],
            value: value || this.props.children,
            name: value || this.props.children,
          },
        },
      };
    }
    return adoptedValue;
  };
  render() {
    return <EditableWithInput getAdoptedValue={this.getAdoptedValue} {...this.props} />;
  }
}

export default connect()(EditableAnswer);
