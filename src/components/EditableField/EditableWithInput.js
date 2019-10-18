import React from 'react';
import { connect } from 'react-redux';
import './editable-element.scss';
import TextInput from 'components/TextInput/TextInput';
import TextUtilit from 'components/TextUtilit/TextUtilit';
import EditableWithInputContainer from './EditableWithInputContainer';

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
    // const ALPHABET_START_CODE = 97;
    const { task, param_name, index, handleFunction } = this.props;
    // const answerLetter = String.fromCharCode(ALPHABET_START_CODE + index);
    // const getAnswerLetter = index => String.fromCharCode(ALPHABET_START_CODE + index);
    // if (this.props.task.kind == 'inputs' && this.props.editableAnswer) {
    //   const answers = this.state.value.match(/%\{.*?\}/g) || [];
    //   const answersWithoutBrackets = [];
    //   answers.forEach(item => {
    //     answersWithoutBrackets = [
    //       ...answersWithoutBrackets,
    //       item.replace('%{', '').replace('}', ''),
    //     ];
    //   });
    //   const processedAnswers = answersWithoutBrackets.reduce((accum, item, index) => {
    //     return { ...accum, [getAnswerLetter(index)]: item };
    //   }, {});
    //   let question = this.state.value;
    //   answersWithoutBrackets.forEach((item, index) => {
    //     question = question.replace(`%{${item}}`, `%{${getAnswerLetter(index)}}`);
    //   });
    //   value = {
    //     inputs: {
    //       ...task[param_name].inputs,
    //       [answerLetter]: {
    //         answers: processedAnswers,
    //         question: question,
    //       },
    //     },
    //   };
    // } else if (this.props.task.kind == 'variant' && this.props.editableAnswer) {
    //   value = {
    //     variants: {
    //       ...task[param_name].variants,
    //       [answerLetter]: {
    //         ...task[param_name].variants[answerLetter],
    //         value: this.state.value || this.props.children,
    //         name: this.state.value || this.props.children,
    //       },
    //     },
    //   };
    // }

    this.setState(() => ({ editing: false }));
    handleFunction(task.id, {
      [param_name]: value || this.state.value || this.props.children,
    });
  };
  onValueChange = value => {
    this.setState(() => ({ value: value }));
  };
  render() {
    return <EditableWithInputContainer getAdoptedValue={this.getAdoptedValue} {...this.props} />;
  }
}

export default connect()(EditableWithInput);
