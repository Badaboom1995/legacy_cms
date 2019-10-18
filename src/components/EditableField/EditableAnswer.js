import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import EditableWithInput from './EditableWithInput';

class EditableAnswer extends React.Component {
  state = {
    editing: false,
    value: '',
  };

  getAdoptedValue = value => {
    let adoptedValue = '';
    const ALPHABET_START_CODE = 97;
    const { task, param_name, index, handleFunction } = this.props;
    const answerLetter = String.fromCharCode(ALPHABET_START_CODE + index);
    const getAnswerLetter = index => String.fromCharCode(ALPHABET_START_CODE + index);
    if (this.props.task.kind == 'inputs') {
      const answers = value.match(/%\{.*?\}/g) || [];
      const answersWithoutBrackets = [];
      answers.forEach(item => {
        answersWithoutBrackets = [
          ...answersWithoutBrackets,
          item.replace('%{', '').replace('}', ''),
        ];
      });
      const processedAnswers = answersWithoutBrackets.reduce((accum, item, index) => {
        return { ...accum, [getAnswerLetter(index)]: item };
      }, {});
      let question = value;
      answersWithoutBrackets.forEach((item, index) => {
        question = question.replace(`%{${item}}`, `%{${getAnswerLetter(index)}}`);
      });
      adoptedValue = {
        inputs: {
          ...task[param_name].inputs,
          [answerLetter]: {
            answers: processedAnswers,
            question: question,
          },
        },
      };
    } else if (this.props.task.kind == 'variant') {
      adoptedValue = {
        variants: {
          ...task[param_name].variants,
          [answerLetter]: {
            ...task[param_name].variants[answerLetter],
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
